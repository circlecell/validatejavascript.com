const loadRules = require('eslint/lib/load-rules');
const reactPlugin = require('eslint-plugin-react');
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');

const airbnb = require('eslint-config-airbnb');
const google = require('eslint-config-google');
const standard = require('eslint-config-standard');
const eslint = require('eslint/conf/eslint-recommended');

function getRules(config) {
    const rules = {};
    if (config.rules) {
        Object.assign(rules, config.rules);
    }

    if (config.extends) {
        for (const configPath of config.extends) {
            // eslint-disable-next-line import/no-dynamic-require
            Object.assign(rules, getRules(require(configPath)));
        }
    }

    return rules;
}

const configs = {
    airbnb: getRules(airbnb),
    google: getRules(google),
    standard: getRules(standard),
    eslint: getRules(eslint)
};

const rulesList = {
    eslint: Object.keys(loadRules()),
    react: Object.keys(reactPlugin.rules),
    'jsx-a11y': Object.keys(jsxA11yPlugin.rules)
};

module.exports = (req, res) => {
    res.json({ payload: { rulesList, configs } });
};
