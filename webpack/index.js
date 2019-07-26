/* eslint-disable global-require */
module.exports = {
  entry: require('./entry'),
  devtool: require('./devtool'),
  plugins: require('./plugins'),
  output: require('./output'),
  module: require('./module'),
  devServer: require('./devServer'),
};
