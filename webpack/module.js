const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  rules: [{
    test: /\.js$/,
    use: 'babel-loader',
  }, {
    test: /\.json$/,
    use: 'json-loader',
  }, {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'postcss-loader'],
    }),
  }],
};
