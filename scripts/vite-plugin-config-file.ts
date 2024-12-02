import fs from 'fs';
import path from 'path';

export interface ViteConfig {
    VITE_CONFIG: string;
    VITE_ENABLE_MOCK: boolean;
    VITE_MOCKS?: string[];
}

export function generateConfigPlugin(config: ViteConfig, outputPath: string) {
    return {
        name: 'vite-plugin-generate-config',
        buildStart() {
            const configPath = path.resolve(outputPath);
            const content = [
                `export const VITE_CONFIG = JSON.parse('${config.VITE_CONFIG}');`,
                `export const VITE_ENABLE_MOCK = ${config.VITE_ENABLE_MOCK};`,
                `export const VITE_MOCKS = [${config.VITE_MOCKS?.map((x) => `'${x}'`).join(',')}];`
            ].join('\n');
            fs.writeFileSync(configPath, content);
            console.log(`Config written to ${configPath}`);
        }
    };
}
