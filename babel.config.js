module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            ["module-resolver", {
                "alias": {
                    "@assets": "./assets",
                    "@src": "./src"
                },
                "extensions": [
                    ".js",
                    ".jsx",
                    ".ttf"
                ]
            }],
            "react-native-worklets/plugin",
        ]
    };
};