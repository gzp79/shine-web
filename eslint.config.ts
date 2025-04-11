import js from '@eslint/js';
import stylisticTs from '@stylistic/eslint-plugin-ts';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

export default [
    js.configs.recommended,
    ...ts.configs.recommended,
    ...svelte.configs.recommended,
    prettier,
    ...svelte.configs['flat/prettier'],
    {
        plugins: {
            '@stylistic/ts': stylisticTs
        },
        languageOptions: {
            globals: {
                ENABLE_MOCK: 'readonly',
                ...globals.browser,
                ...globals.node
            }
        },
        rules: {
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    args: 'all',
                    argsIgnorePattern: '^_',
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    ignoreRestSiblings: true
                }
            ],
            '@stylistic/ts/quotes': ['error', 'single']
        }
    },
    {
        files: ['**/*.svelte', '**/*.svelte.ts'],
        languageOptions: {
            parserOptions: {
                projectService: true,
                extraFileExtensions: ['.svelte'],
                parser: ts.parser,
                svelteConfig
            }
        }
    },
    {
        ignores: ['build/', '.svelte-kit/', 'dist/', 'static-generated/']
    }
];
