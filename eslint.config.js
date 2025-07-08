import wdioEslint from '@wdio/eslint'

/**
 * This project uses a custom WebdriverIO ESLint configuration for ESLint v9.
 * Feel free to replace this with your own ESLint configuration.
 */
export default [
    ...wdioEslint.config(),
    {
        ignores: ['.history/**', '.yalc/**']
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname,
            }
        },
        rules: {
            '@typescript-eslint/no-floating-promises': 'error'
        }
    }
]
