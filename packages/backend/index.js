const express = require('express');
const lint = require('./lint')

const app = express();

const { PORT, NODE_ENV } = process.env;
const port = PORT;

if(NODE_ENV === 'production') {
    app.use(express.static(`${__dirname}/public`));
}

app.get('/api', function (req, res) {
    res.send('Hello World!');
});

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});
