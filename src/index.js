import eslint from '../eslint/webpack/eslint';
const plugins = {
    react: require('eslint-plugin-react'),
    'jsx-a11y': require('eslint-plugin-jsx-a11y'),
    babel: require('eslint-plugin-babel'),
    //lodash: require('eslint-plugin-lodash'),
    flowtype: require('eslint-plugin-flowtype'),
    jsdoc: require('eslint-plugin-jsdoc')
}

const stdRules = require('../eslint/webpack/load-rules')();
const foreignRules = {};

for(const [pluginName, plugin] of Object.entries(plugins)) {
    const { rules } = plugin;
    for(const [ruleName, rule] of Object.entries(rules)) {
        foreignRules[`${pluginName}/${ruleName}`] = rule;
    }
}



console.log(foreignRules);
eslint.defineRules(foreignRules)

var messages = eslint.verify(`class X {
    @eblinskyu foo = 5;
}`, {
    ...require('../configs/eslint-config-canonical.json'),
    plugins: []
}, { filename: "foo.js" });

console.log(messages);
//console.log(require('eslint-config-airbnb'));
