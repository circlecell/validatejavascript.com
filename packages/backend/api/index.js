const { Router } = require('express');
const lint = require('./lint');
const init = require('./init');

module.exports = new Router()
  .post('/lint', lint)
  .get('/init', init);
