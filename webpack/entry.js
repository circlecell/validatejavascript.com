const { isDevelopment, devPort } = require('./env');

const entry = {
    app: []
};

if (isDevelopment) {
    entry.app.push(`webpack-dev-server/client?http://localhost:${devPort}`);
}

entry.app.push(
    './packages/frontend/css/style.css',
    // 'babel-polyfill',
    './packages/frontend/index'
);

module.exports = entry;
