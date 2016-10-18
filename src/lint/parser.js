let parser;

function setParser(parserName) {
    return new Promise((resolve, reject) => {
        if (parserName === 'espree') {
            parser = require('espree');

            resolve();
        } else if (parserName === 'babel') {
            require.ensure([], (require) => {
                parser = require('../lib/babel-parser');

                resolve();
            }, 'babel-parser');
        } else {
            reject(new Error(`No such parser "${parserName}"`));
        }
    });
}

function parse(...args) {
    return parser.parse(...args);
}

setParser('espree');

module.exports = {
    setParser,
    parse
};
