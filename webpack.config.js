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

plugins.push(
    new CopyWebpackPlugin([]),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
);

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
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /.js?$/,
            loaders: [
                `string-replace?search=require(config.parser)&replace=require("../../src/parser")`,
                `string-replace?search=require('comment-parser')&replace=require("comment-parser/parser")`
            ]
        }, {
            test: /.json?$/,
            loader: 'json'
        }]
    },
    devtool: 'source-map'
};
