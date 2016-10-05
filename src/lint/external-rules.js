import plugins from './plugins';

const external = {};

for(const { name, plugin } of plugins) {
    const { rules } = plugin;
    for(const [ruleName, rule] of Object.entries(rules)) {
        external[`${name}/${ruleName}`] = rule;
    }
}

export default external;
