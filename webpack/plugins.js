const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const { isDevelopment, isProduction } = require('./env');

const plugins = [
  new HtmlWebpackPlugin({
    template: 'packages/frontend/index.html',
    chunksSortMode: (a, b) => {
      const order = ['manifest', 'vendor', 'app'];
      const nameA = a.names[0];
      const nameB = b.names[0];

      return order.indexOf(nameA) - order.indexOf(nameB);
    },
  }),
];

if (isDevelopment) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
  );
} else if (isProduction) {
  plugins.push(new UglifyJsPlugin());
}

plugins.push(new CopyWebpackPlugin({
  patterns: [{ from: './packages/frontend/static' }],
}));

module.exports = plugins;
