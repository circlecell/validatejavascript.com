import plugins from './plugins';

const external = {};

for(const [pluginName, plugin] of Object.entries(plugins)) {
    const { rules } = plugin;
    for(const [ruleName, rule] of Object.entries(rules)) {
        external[`${pluginName}/${ruleName}`] = rule;
    }
}

export default external;
