const { NODE_ENV } = process.env;
const { port } = require('minimist')(process.argv.slice(2));

if (!NODE_ENV) {
    throw Error('NODE_ENV cannot be falsy');
}

module.exports = {
    isDevelopment: NODE_ENV === 'development',
    isProduction: NODE_ENV === 'production',
    port
};
