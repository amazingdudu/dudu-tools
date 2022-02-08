const merge = require('merge');

function initProjectConfig({ appName, usePrettier = true, useEslint = true, useStylelint = true }) {
    const packageJson = {
        name: appName,
        version: '1.0.0',
        description: '',
        main: 'lib/index.js',
        module: 'es/index.js',
        unpkg: `dist/${appName}.min.js`,
        typings: 'lib/index.d.ts',
        files: ['dist', 'es', 'lib'],
        private: true,
        repository: {
            type: 'git',
            url: ''
        },
        keywords: [],
        scripts: {
            test: 'echo "Error: no test specified" && exit 1',
            compile: 'dudu run compile',
            'compile:es': 'dudu run es',
            'compile:lib': 'dudu run lib',
            'compile:dist': 'dudu run dist',
            clean: 'dudu run clean',
            pub: 'npm run compile && cnpm publish --tag=beta ./ --registry=http://registry.shuqudata.com/',
            tsc: 'tsc --noEmit'
        }
    };
    const devDependencies = [
        'react',
        'react-dom',
        '@types/react',
        '@types/react-dom',
        'typescript'
    ];
    if (usePrettier) {
        const eslintDep = ['prettier', 'husky', 'pretty-quick', 'prettier-plugin-packagejson'];
        devDependencies.push(...eslintDep);

        merge.recursive(packageJson, {
            scripts: {
                prettier: "prettier -c -w '**/*'"
            },
            husky: {
                hooks: {
                    'pre-commit': 'pretty-quick --staged'
                }
            }
        });
    }
    if (useEslint) {
        const eslintDep = [
            'eslint',
            'eslint-config-airbnb',
            'eslint-config-prettier',
            'eslint-plugin-import',
            'eslint-plugin-jsx-a11y',
            'eslint-plugin-react',
            'eslint-plugin-react-hooks',
            '@typescript-eslint/eslint-plugin',
            '@typescript-eslint/parser'
        ];
        devDependencies.push(...eslintDep);

        merge.recursive(packageJson.scripts, {
            'lint-fix:script': 'npm run lint:script -- --fix',
            'lint:script': 'eslint --ext .ts,.tsx src/',
            lint: 'npm run lint:script && npm run tsc'
        });
    }

    if (useStylelint) {
        const stylelintDev = [
            'stylelint',
            'stylelint-config-prettier',
            'stylelint-config-rational-order',
            'stylelint-config-standard',
            'stylelint-order'
        ];

        devDependencies.push(...stylelintDev);

        merge.recursive(packageJson.scripts, {
            'lint:style': "stylelint 'src/**/*.less'",
            lint: 'npm run lint:script && npm run lint:style && npm run tsc'
        });
    }

    return { packageJson, devDependencies };
}

module.exports = initProjectConfig;
