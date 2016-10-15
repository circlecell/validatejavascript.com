const { isDevelopment, port } = require('./env');

const entry = {
    app: []
};

if (isDevelopment) {
    entry.app.push(`webpack-dev-server/client?http://localhost:${port}`);
}

entry.app.push(
    './src/css/style.css',
    'babel-polyfill',
    './src/index'
);

module.exports = entry;
