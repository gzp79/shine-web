import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import svgo from 'svgo';
import { fileURLToPath } from 'url';
import { type Plugin } from 'vite';
import * as yaml from 'yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');

const contentInputDir = path.join(root, 'assets');
const contentFile = path.join(contentInputDir, 'assets.json');

const contentOutputDir = path.join(root, 'static-generated/assets');
const linkContentFile = path.join(root, 'src/generated/assets.ts');

type ConverterType = 'group' | 'copy' | 'minimizeSVG' | 'minimizeYAML' | 'convertWebP';

interface Task {
    path: string;
    converter: ConverterType;
}

type VariantKind = string;
type TargetPath = string;

interface Variant {
    variant: VariantKind;
    postfix: string;
}

interface Content {
    task: Task;
    rev: string;
    sourcePath: string;
    sourceBuffer?: Buffer;
    targets: Record<VariantKind, TargetPath>;
}

abstract class Converter {
    abstract getVariants(content: Content): Variant[];
    abstract convert(content: Content): Promise<void>;

    protected getOutputPath(content: Content, variant: string): string {
        const relativePath = content.targets[variant];
        const outputPath = path.join(contentOutputDir, relativePath);
        //console.log(`[${content.task.path}] Output: ${outputPath}`);
        return outputPath;
    }
}

class CopyConverter extends Converter {
    getVariants(content: Content): Variant[] {
        const sourceExt = path.extname(content.task.path);
        return [{ variant: '', postfix: sourceExt }];
    }

    async convert(content: Content) {
        await fs.writeFile(this.getOutputPath(content, ''), content.sourceBuffer!);
    }
}

class MinimizeSVGConverter extends Converter {
    getVariants(content: Content): Variant[] {
        const sourceExt = path.extname(content.task.path);
        if (sourceExt !== '.svg') {
            throw new Error('Converter can only be used with SVG files.');
        }

        return [{ variant: '', postfix: '.svg' }];
    }

    async convert(content: Content) {
        const source = content.sourceBuffer!.toString('utf-8');
        const { data: optimized } = await svgo.optimize(source);
        await fs.writeFile(this.getOutputPath(content, ''), optimized);
    }
}

class MinimizeYAMLConverter extends Converter {
    getVariants(content: Content): Variant[] {
        const sourceExt = path.extname(content.task.path);
        if (sourceExt !== '.yaml' && sourceExt !== '.yml') {
            throw new Error('Converter can only be used with YAML and YML files only.');
        }

        return [{ variant: '', postfix: '.yml' }];
    }

    async convert(content: Content) {
        const sourceStr = content.sourceBuffer!.toString('utf-8');
        const source = yaml.parse(sourceStr);
        const optimized = yaml.stringify(source, {
            indentSeq: false,
            simpleKeys: true
        });
        await fs.writeFile(this.getOutputPath(content, ''), optimized);
    }
}

class ConvertWebPConverter extends Converter {
    getVariants(/*content: Content*/): Variant[] {
        return [
            { variant: '', postfix: '.webp' },
            //{ variant: '_small', postfix: '_sm.webp' },
            { variant: '_alt', postfix: '.jpg' }
        ];
    }

    async convert(content: Content) {
        const image = await sharp(content.sourceBuffer!);
        //const metadata = await image.metadata();

        await image.webp().toFile(this.getOutputPath(content, ''));
        await image.jpeg().toFile(this.getOutputPath(content, '_alt'));
        /*await image
            .resize(Math.floor(metadata.width! / 2), Math.floor(metadata.height! / 2))
            .webp()
            .toFile(this.getOutputPath(content, '_small'));*/
    }
}

const CONVERTERS: Record<ConverterType, Converter> = {
    // it should be never used
    group: undefined!,

    copy: new CopyConverter(),
    minimizeSVG: new MinimizeSVGConverter(),
    minimizeYAML: new MinimizeYAMLConverter(),
    convertWebP: new ConvertWebPConverter()
};

async function isFileOutdated(taskPath: string, sourcePath: string, relativeTargetPaths: string[]): Promise<boolean> {
    const sourceStats = await fs.stat(sourcePath);
    for (const relativeTargetPath of relativeTargetPaths) {
        const targetPath = path.join(contentOutputDir, relativeTargetPath);
        try {
            const targetStats = await fs.stat(targetPath);
            if (sourceStats.mtime > targetStats.mtime) {
                console.log(`[${taskPath}] Target (${targetPath}) is outdated.`);
                return true;
            }
        } catch {
            console.log(`[${taskPath}] Target (${targetPath}) not found.`);
            return true;
        }
    }

    //console.log(`[${taskPath}] Targets are up-to-date.`);
    return false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function flattenContents(module: string | null, contents: Record<string, any>): Record<string, Task> {
    const result: Record<string, Task> = {};
    for (const [key, task] of Object.entries(contents)) {
        if (task.converter === undefined) continue;

        const moduleKey = module ? `${module}.${key}` : key;
        if (task.converter === 'group') {
            const subContents = flattenContents(moduleKey, task as Record<string, Task>);
            Object.assign(result, subContents);
        } else {
            result[moduleKey] = task;
        }
    }

    return result;
}

function toContentLink(relativeTargetPath: string): string {
    const normalizedPath = relativeTargetPath.replace(/\\/g, '/');
    return normalizedPath;
}

async function convertContent(force: boolean, version: string): Promise<Record<string, Content>> {
    const rawContents: Record<string, Task> = JSON.parse(await fs.readFile(contentFile, 'utf-8'));
    const contents: Record<string, Task> = flattenContents(null, rawContents);

    const contentMap: Record<string, Content> = {};

    console.log(`Creating directory: ${contentOutputDir}`);
    const targetFolder = path.join(contentOutputDir, version);
    await fs.mkdir(targetFolder, { recursive: true });

    for (const [key, task] of Object.entries(contents)) {
        const sourcePath = path.join(contentInputDir, task.path);

        const sourceContent = await fs.readFile(sourcePath);
        const rev = crypto.createHash('sha256').update(sourceContent).digest('hex').substring(0, 32);

        const converter = CONVERTERS[task.converter];

        const content: Content = {
            task,
            rev,
            sourcePath: sourcePath,
            sourceBuffer: sourceContent,
            targets: {}
        };
        contentMap[key] = content;

        const variants = converter.getVariants(content);
        for (const variant of variants) {
            const relativeTargetPath = path.join(version, `${rev}${variant.postfix}`);
            content.targets[variant.variant] = relativeTargetPath;
        }

        const relativeTargetPaths = Object.values(content.targets);
        const targetLinks = relativeTargetPaths.map((x) => toContentLink(x));
        console.log(`[${task.path}] Converting (${task.converter}): ${sourcePath} -> [${targetLinks.join(', ')}]`);
        if (force || (await isFileOutdated(task.path, sourcePath, relativeTargetPaths))) {
            await converter.convert(content);
            console.log(`[${task.path}] Conversion done.`);
        } else {
            console.log(`[${task.path}] Conversion skipped.`);
        }

        content.sourceBuffer = undefined;
    }

    return contentMap;
}

// convert a . separated string to a camel case string
function toContentName(key: string): string {
    return key.replace(/\.([a-z])/g, (_, match) => match.toUpperCase());
}

async function createLinkFile(contents: Record<string, Content>) {
    const linkContent: string[] = [];
    linkContent.push('export const assets = {');

    let first = true;
    for (const [key, content] of Object.entries(contents)) {
        if (!first) {
            linkContent.push('');
            first = false;
        }
        const distKey = toContentName(key);
        for (const [suffix, filePath] of Object.entries(content.targets)) {
            const targetPath = toContentLink(filePath);
            linkContent.push(`    ${distKey}${suffix}: '${targetPath}', // ${content.task.path}`);
        }
    }
    linkContent.push('};');
    linkContent.push('');

    const fileContent = linkContent.join('\n');
    // Check if the file is up-to-date to avoid unnecessary writes and re-compiles
    try {
        const originalContent = await fs.readFile(linkContentFile, 'utf-8');
        if (originalContent === fileContent) {
            console.log('Link file is up-to-date.');
            return;
        }
    } catch {
        console.log('Updating link file...');
    }

    await fs.writeFile(linkContentFile, fileContent);
}

async function main() {
    const force = process.argv.includes('--force');
    // parse --version=version
    const versionArg = process.argv.find((arg) => arg.startsWith('--version='));
    let version = versionArg ? versionArg.split('=')[1] : undefined;

    if (process.env.ASSET_VERSION && !version) {
        version = process.env.ASSET_VERSION;
    }
    if (!version) {
        version = 'custom';
    }

    const map = await convertContent(force, version);
    await createLinkFile(map);
}

main()
    .then(() => {
        console.log('Done.');
    })
    .catch((e) => {
        console.error(e);
    });

export function vitePluginAssetConverter(): Plugin[] {
    return [
        {
            name: 'vite-plugin-asset-converter',
            buildStart: async () => {
                await main();
            },
            watchChange(id, change) {
                console.log(`File changed: ${id}`);
                console.log('Change details:', change);
            }
        }
    ];
}
