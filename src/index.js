import eslint from '../eslint/webpack/eslint';
const reactRules = require('eslint-plugin-react').rules;
const jsxRules = require('eslint-plugin-jsx-a11y').rules;
const xxx = {};
console.log(eslint);

for(const [key, value] of Object.entries(reactRules)) {
    xxx['react/' + key] = value;
}


for(const [key, value] of Object.entries(jsxRules)) {
    xxx['jsx-a11y/' + key] = value;
}


console.log(xxx);
eslint.defineRules(xxx)

var messages = eslint.verify("import x from 'y'; var foo = <Tablo />", {
    ...require('../bundled-config.json'),
    plugins: []
}, { filename: "foo.js" });

console.log(messages);
//console.log(require('eslint-config-airbnb'));
