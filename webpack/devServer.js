const { port, devPort } = require('./env');

module.exports = {
  publicPath: '/',
  hot: true,
  inline: true,
  stats: 'normal',
  port: devPort,
  proxy: {
    '/api/*': `http://localhost:${port}`,
  },
  open: true,
};
