const path = require('path');

module.exports = {
  path: path.resolve(__dirname, '../packages/backend/public/'),
  filename: 'js/[name].js',
  library: 'app',
  libraryTarget: 'var',
  chunkFilename: 'js/[name].chunk.js',
  publicPath: '/',
};
