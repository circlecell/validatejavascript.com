const express = require('express');
const api = require('./api')
const bodyParser = require('body-parser')

//console.log(lint('var x = <Foobar />; console.log("nopp")', { fix: true }).results[0])

const app = express();

const { PORT, NODE_ENV } = process.env;
const port = PORT;

/*app.use(bodyParser.urlencoded({
    extended: true
}));*/

app.use(bodyParser.json());

if(NODE_ENV === 'production') {
    app.use(express.static(`${__dirname}/public`));
}

app.use('/api', api);

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});
