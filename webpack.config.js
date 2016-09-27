const CopyWebpackPlugin = require('copy-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var StringReplacePlugin = require("string-replace-webpack-plugin");
const { port } = require('minimist')(process.argv.slice(2));
const webpack = require('webpack');

const { NODE_ENV } = process.env;

const entry = {
    app: []
};
const plugins = [
    new HtmlWebpackPlugin({
        template: 'index.html',
        chunksSortMode: (a, b) => {
            const order = ['manifest', 'vendor', 'app'];
            const nameA = a.names[0];
            const nameB = b.names[0];

            return order.indexOf(nameA) - order.indexOf(nameB);
        }
    }),
    new webpack.ContextReplacementPlugin(/eslint\/webpack/, /$^/)
];

if (NODE_ENV === 'development') {
    entry.app.push(`webpack-dev-server/client?http://localhost:${port}`);
    plugins.push(new OpenBrowserPlugin({
        url: `http://localhost:${port}`,
        ignoreErrors: true
    }));
}

entry.app.push(
    'babel-polyfill',
    './src/index'
);

plugins.push(new CopyWebpackPlugin([]));

module.exports = {
    entry,
    plugins,
    output: {
        path: 'bundle/',
        filename: 'js/app.js',
        library: 'app',
        libraryTarget: 'var'
    },
    module: {
        loaders: [{
            test: /.js?$/,
            loaders: [
                'babel',
                `string-replace?search=require(config.parser)&replace=require("espree")`
            ],
            exclude: /node_modules/
        }, {
            test: /.json?$/,
            loader: 'json'
        }]
    },
    devtool: 'source-map'
};
