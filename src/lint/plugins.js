import eslint from '../../eslint/webpack/eslint';

const getFullRuleName = (ruleId, pluginName) => `${pluginName}/${ruleId}`;
const isExternal = true;
const externalRules = {};

const plugins = [{
    name: 'internal',
    isExternal: false,
    getFullRuleName: ruleId => ruleId,
    getСlarificationURL: ruleId => `http://eslint.org/docs/rules/${ruleId}`,
    plugin: {
        rules: require('../../eslint/webpack/load-rules')(),
        configs: {
            recommended: require('../../eslint/conf/eslint.json')
        }
    }
}, {
    name: 'react', // airbnb
    isExternal,
    getFullRuleName,
    getСlarificationURL: ruleId => `https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/${ruleId}.md`,
    plugin: require('eslint-plugin-react'),
}, {
    name: 'jsx-a11y', // airbnb
    isExternal,
    getFullRuleName,
    getСlarificationURL: ruleId => `https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/${ruleId}.md`,
    plugin: require('eslint-plugin-jsx-a11y'),
}, {
    name: 'promise', // standard
    isExternal,
    getFullRuleName,
    getClarificationURL: ruleId => `https://github.com/xjamundx/eslint-plugin-promise#${ruleId}`,
    plugin: require('eslint-plugin-promise'),
}, {
    name: 'standard', // standard
    isExternal,
    getFullRuleName,
    getClarificationURL: () => 'https://github.com/xjamundx/eslint-plugin-standard',
    plugin: require('eslint-plugin-standard'),
}];


for(const { isExternal, name, plugin: { rules } } of plugins) {
    if(isExternal) {
        for(const [ruleName, rule] of Object.entries(rules)) {
            externalRules[`${name}/${ruleName}`] = rule;
        }
    }
}

eslint.defineRules(externalRules);

export default plugins;
