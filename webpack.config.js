const CopyWebpackPlugin = require('copy-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { port } = require('minimist')(process.argv.slice(2));

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
    })
];

if (NODE_ENV === 'development') {
    entry.app.push(`webpack-dev-server/client?http://localhost:${port}`);
    plugins.push(new OpenBrowserPlugin({
        url: `http://localhost:${port}`,
        ignoreErrors: true
    }));
}

entry.app.push(
    './src/index'
);

plugins.push(new CopyWebpackPlugin([
	//{ from: 'index.html' },
]));

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
        //noParse: /eslint\/build\/eslint.js/, // disables warnings
        loaders: [{
            test: /.js?$/,
            loader: 'babel',
            exclude: /node_modules/
        }]
    },
    devtool: 'source-map'
};
