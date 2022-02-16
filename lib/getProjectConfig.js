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
            clean: 'dudu run clean',
            compile: 'dudu run compile',
            'compile:dist': 'dudu run dist',
            'compile:es': 'dudu run es',
            'compile:lib': 'dudu run lib',
            eslint: 'eslint --ext .ts,.tsx src/',
            'eslint-fix': 'npm run eslint -- --fix',
            lint: 'npm run eslint && npm run stylelint && npm run tsc',
            'lint-fix': 'npm run eslint-fix && npm run stylelint-fix',
            prepare: 'husky install',
            prettier: "prettier -c -w '**/*'",
            pub: 'npm run lint && npm run compile:lib && cnpm publish ./ --registry=http://registry.shuqudata.com/',
            stylelint: "stylelint 'src/**/*.less'",
            'stylelint-fix': 'npm run stylelint --fix',
            tag: 'npm run lint && npm run compile:lib && cnpm publish --tag=beta ./ --registry=http://registry.shuqudata.com/',
            test: 'echo "Error: no test specified" && exit 1',
            tsc: 'tsc --noEmit'
        },
        devDependencies: {
            '@bairong/dudu-tools': '^2.0.1',
            '@types/react': '^17.0.39',
            '@types/react-dom': '^17.0.11',
            '@typescript-eslint/eslint-plugin': '^5.11.0',
            '@typescript-eslint/parser': '^5.11.0',
            eslint: '^8.8.0',
            'eslint-config-airbnb': '^19.0.4',
            'eslint-config-prettier': '^8.3.0',
            'eslint-plugin-import': '^2.25.4',
            'eslint-plugin-jsx-a11y': '^6.5.1',
            'eslint-plugin-react': '^7.28.0',
            'eslint-plugin-react-hooks': '^4.3.0',
            husky: '^7.0.4',
            'postcss-less': '^6.0.0',
            prettier: '^2.5.1',
            'prettier-plugin-packagejson': '^2.2.15',
            'pretty-quick': '^3.1.3',
            react: '^17.0.2',
            'react-dom': '^17.0.2',
            stylelint: '^14.3.0',
            'stylelint-config-prettier': '^9.0.3',
            'stylelint-config-rational-order': '^0.1.2',
            'stylelint-config-standard': '^24.0.0',
            'stylelint-order': '^5.0.0',
            typescript: '^4.5.5'
        },
        peerDependencies: {
            react: '>=17.0.2',
            'react-dom': '>=17.0.2'
        }
    };

    return packageJson;
}

module.exports = initProjectConfig;
