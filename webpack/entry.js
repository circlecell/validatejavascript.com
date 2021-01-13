const { isDevelopment, devPort } = require('./env');

const entry = {
  app: [],
};

if (isDevelopment) {
  entry.app.push(`webpack-dev-server/client?http://localhost:${devPort}`);
}

entry.app.push(
  './packages/frontend/index',
);

module.exports = entry;
