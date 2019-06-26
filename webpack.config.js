const path = require("path");

module.exports = {
    target: "electron-renderer",
    entry: {
        main: "./src/view/index.js"
    },
    output: {
        path: path.resolve(__dirname + "/dist/view"),
        filename: "index.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
};
