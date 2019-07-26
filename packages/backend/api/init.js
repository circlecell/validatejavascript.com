const { Linter } = require('eslint');
const reactPlugin = require('eslint-plugin-react');
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');

const eslintRules = new Linter().getRules();

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
  eslint: getRules(eslint),
};

const getRuleInfo = ([name, value]) => ({
  name,
  docs: value.meta.docs,
});

const rulesList = {
  eslint: [...eslintRules].map(getRuleInfo),
  react: Object.entries(reactPlugin.rules).map(getRuleInfo),
  'jsx-a11y': Object.entries(jsxA11yPlugin.rules).map(getRuleInfo),
};

module.exports = (req, res) => {
  res.json({ payload: { rulesList, configs } });
};
