function initProjectConfig(appName) {
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
        keywords: [
            'component',
            'components',
            'framework',
            'frontend',
            'react',
            'react-component',
            'ui'
        ],
        scripts: {
            test: 'echo "Error: no test specified" && exit 1',
            compile: 'dudu run compile',
            'compile:es': 'dudu run es',
            'compile:lib': 'dudu run lib',
            'compile:dist': 'dudu run dist',
            clean: 'dudu run clean',
            pub: 'npm run lint && npm run compile:lib && cnpm publish ./ --registry=http://registry.shuqudata.com/',
            tag: 'npm run lint && npm run compile:lib && cnpm publish --tag=beta ./ --registry=http://registry.shuqudata.com/',
            tsc: 'tsc --noEmit',
            prettier: "prettier -c -w '**/*'",
            'lint-fix:script': 'npm run lint:script -- --fix',
            'lint:script': 'eslint --ext .ts,.tsx src/',
            'lint:style': "stylelint 'src/**/*.less'",
            lint: 'npm run lint:script && npm run lint:style && npm run tsc'
        }
    };
    const devDependencies = [
        'react',
        'react-dom',
        '@types/react',
        '@types/react-dom',
        'typescript',
        'prettier',
        'husky',
        'pretty-quick',
        'prettier-plugin-packagejson',
        'eslint',
        'eslint-config-airbnb',
        'eslint-config-prettier',
        'eslint-plugin-import',
        'eslint-plugin-jsx-a11y',
        'eslint-plugin-react',
        'eslint-plugin-react-hooks',
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint/parser',
        'stylelint',
        'stylelint-config-prettier',
        'stylelint-config-rational-order',
        'stylelint-config-standard',
        'stylelint-order',
        'postcss-less'
    ];

    return { packageJson, devDependencies };
}

module.exports = initProjectConfig;
