module.exports = {
  rules: [{
    test: /\.js$/,
    use: 'babel-loader',
  }, {
    test: /\.json$/,
    use: 'json-loader',
  }],
};
