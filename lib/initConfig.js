const path = require('path');
const fs = require('fs-extra');
const os = require('os');

function initEslintConfig(cwd, usePrettier = true) {
    const ignore = ['**/*.d.ts', 'dist', 'es', 'lib', 'node_modules'];
    const config = {
        env: {
            browser: true,
            node: true,
            es6: true
        },
        parser: '@typescript-eslint/parser',
        extends: [],
        plugins: ['react', '@typescript-eslint', 'react-hooks'],
        parserOptions: {
            sourceType: 'module',
            ecmaFeatures: {
                jsx: true
            }
        },
        settings: {
            react: {
                version: 'detect'
            }
        },
        overrides: [],
        rules: {}
    };

    const eslintExtends = [
        ['airbnb', true],
        ['prettier', usePrettier],
        ['plugin:react/recommended', true],
        ['plugin:import/typescript', true],
        ['prettier/react', usePrettier]
    ];

    config.extends = eslintExtends.filter(item => item[1]).map(item => item[0]);

    fs.writeFile(path.join(cwd, '.eslintrc'), JSON.stringify(config, null, 2) + os.EOL, err => {
        if (err) throw err;
    });

    fs.writeFile(path.join(cwd, '.eslintignore'), ignore.join('\n') + os.EOL, err => {
        if (err) throw err;
    });
}

function initStylelintConfig(cwd, usePrettier = true) {
    const config = {
        extends: [],
        plugins: ['stylelint-order'],
        rules: {
            indentation: 4
        },
        ignoreFiles: ['**/*.ts', '**/*.tsx', 'dist/**', 'lib/**']
    };

    const stylelintExtends = [
        ['stylelint-config-standard', true],
        ['stylelint-config-rational-order', true],
        ['stylelint-config-prettier', usePrettier]
    ];

    config.extends = stylelintExtends.filter(item => item[1]).map(item => item[0]);

    fs.writeFile(
        path.join(cwd, '.stylelintrc.json'),
        JSON.stringify(config, null, 2) + os.EOL,
        err => {
            if (err) throw err;
        }
    );
}

function initPrettierConfig(cwd) {
    const config = {
        singleQuote: true,
        jsxSingleQuote: true,
        printWidth: 100,
        tabWidth: 4,
        overrides: [
            {
                files: '.prettierrc',
                options: {
                    parser: 'json'
                }
            }
        ],
        arrowParens: 'avoid',
        trailingComma: 'none'
    };

    const ignore = [
        '.DS_Store',
        '.eslintignore',
        '.gitignore',
        '.prettierignore',
        'dist',
        'es',
        'lib',
        'node_module',
        'package-lock.json'
    ];

    fs.writeFile(path.join(cwd, '.prettierrc'), JSON.stringify(config, null, 2) + os.EOL, err => {
        if (err) throw err;
    });

    fs.writeFile(path.join(cwd, '.prettierignore'), ignore.join('\n') + os.EOL, err => {
        if (err) throw err;
    });
}

function copyTemplate(cwd) {
    fs.copy(path.join(__dirname, '../template'), cwd, err => {
        if (err) throw err;
    });
}

function initConfig(cwd, { usePrettier = true, useEslint = true, useStylelint = true } = {}) {
    copyTemplate(cwd);

    if (usePrettier) {
        initPrettierConfig(cwd);
    }

    if (useEslint) {
        initEslintConfig(cwd, usePrettier);
    }

    if (useStylelint) {
        initStylelintConfig(cwd, usePrettier);
    }
}

module.exports = initConfig;
