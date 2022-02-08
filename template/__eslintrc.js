module.exports = {
    env: {
        browser: true,
        commonjs: true,
        node: true,
        es6: true
    },
    parser: '@typescript-eslint/parser',
    extends: [
        'airbnb',
        'prettier',
        'plugin:react/recommended',
        'plugin:import/typescript',
    ],
    plugins: ['react', '@typescript-eslint', 'react-hooks'],
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    globals: {},
    settings: {
        react: {
            version: 'detect'
        }
    },
    overrides: [],
    rules: {}
};
