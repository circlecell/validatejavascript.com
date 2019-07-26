const { NODE_ENV, PORT } = process.env;

if (!NODE_ENV) {
  throw Error('NODE_ENV cannot be falsy');
}

module.exports = {
  isDevelopment: NODE_ENV === 'development',
  isProduction: NODE_ENV === 'production',
  port: PORT,
  devPort: +PORT + 1,
};
