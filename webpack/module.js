const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    loaders: [{
        test: /\.js$/,
        loader: 'babel'
    }, {
        test: /\.js$/,
        loaders: [
            `string-replace?search=require(config.parser)&replace=require("../../src/lint/parser")`, // eslint itself
            `string-replace?search=require(rules[ruleId])&replace=undefined`, // eslint itself
        ]
    }, {
        test: /\.json$/,
        loader: 'json'
    }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss')
    }]
}
