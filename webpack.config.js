const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [{
    entry: {
        "quill.imageUploader": "./src/quill.imageUploader.js",
        demo: "./src/demo.js",
    },
    output: {
        filename: "[name].min.js",
        path: path.resolve(__dirname, "dist"),
    },
    devServer: {
        //contentBase: './src',
        https: true,
    },
    externals: {
        quill: "Quill",
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: true,
                cache: true,
                parallel: true,
                sourceMap: true, // Must be set to true if using source-maps in production
                terserOptions: {
                    // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                    extractComments: "all",
                    compress: {
                        drop_console: false,
                    },
                },
            }),
        ],
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader",
                    }, ],
                }),
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    plugins: [new ExtractTextPlugin("quill.imageUploader.min.css")],
}, ];