const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/app.jsx",

    output: {
        path: path.resolve(__dirname, "dist"),
    },

    mode: 'development',

    devServer: {
        host: "localhost",
        port: 3000
    },

    plugins: [
        new HtmlWebpackPlugin({
        template: path.join(__dirname, 'static', 'template.html'),
        }),
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', "css-loader", "sass-loader"],
            },
            {
                test: /\.(eot|ttf|woff|woff2|png|jpg|gif)$/i,
                type: "asset",
            },
            {
                test: /\.svg$/i,
                use: [{loader: '@svgr/webpack', options:{
                    dimensions: false
                }}]
            }
        ],
    },
};