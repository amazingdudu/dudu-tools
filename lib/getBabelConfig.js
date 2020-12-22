module.exports = function getBabelConfig(modules) {
    const plugins = [
        require('@babel/plugin-proposal-class-properties'),
        require('@babel/plugin-proposal-object-rest-spread')
    ];
    return {
        presets: [
            [
                require('@babel/preset-env'),
                {
                    modules,
                    targets: {
                        browsers: ['iOS >= 8', 'Android >= 4.4']
                    }
                }
            ],
            require('@babel/preset-typescript'),
            require('@babel/preset-react')
        ],
        plugins
    };
};
