const { isDevelopment } = require('./env');

module.exports = isDevelopment ? 'cheap-source-map' : 'source-map';
