module.exports = function getBabelConfig(modules) {
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
            require('@babel/preset-react'),
            require('@babel/preset-typescript')
        ]
    };
};
