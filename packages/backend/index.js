const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');

const app = express();

const { PORT, NODE_ENV } = process.env;
const port = PORT;

app.use(bodyParser.json());

if (NODE_ENV === 'production') {
  app.use(express.static(`${__dirname}/public`));
}

app.use('/api', api);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}!`);
});
