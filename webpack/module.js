const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    rules: [{
        test: /\.js$/,
        use: 'babel-loader'
    }, {
        test: /\.js$/,
        use: [{
            loader: 'string-replace-loader',
            options: {
                search: 'require(config.parser)',
                replace: 'require("../../src/lint/parser")'
            }
        }, {
            loader: 'string-replace-loader',
            options: {
                search: 'require(rules[ruleId])',
                replace: 'undefined'
            }
        }]
    }, {
        test: /\.json$/,
        use: 'json-loader'
    }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'postcss-loader']
        })
    }]
};
