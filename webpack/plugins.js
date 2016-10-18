const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { isDevelopment, isProduction, port } = require('./env');

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
    new ExtractTextPlugin('css/style.css', {
        allChunks: true
    })
];

if (isDevelopment) {
    plugins.push(
        new OpenBrowserPlugin({
            url: `http://localhost:${port}`,
            ignoreErrors: true
        })
    );
} else if (isProduction) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    );
}

plugins.push(
    new CopyWebpackPlugin([])
);

module.exports = plugins;
