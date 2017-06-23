import MatreshkaArray from 'matreshka/array';
import RulesGroup from './RulesGroup';
// import plugins from '../lint/plugins';

export default class Rules extends MatreshkaArray {
    Model = RulesGroup;
    constructor(data, parent) {
        super()
            .bindNode({
                sandbox: parent.select('.rules')
            })
            .on({
                '*.*@rulechange': () => {
                    this.trigger('rulechange');
                }
            });
        // .render()
        // .recreate(plugins)
        // .update(data);
    }

    /* async render() {
        const { payload } = await ( await fetch('/api/init') ).json();

        this.recreate(Object.entries(payload).map(([pluginName, value]) => ({
            pluginName,
            rules: value.map(name => ({ name, value: 'off' }))
        })))
    }*/

    update(config) {
        /* const groups = {};
        for(const [fullRuleName, value] of Object.entries(config)) {
            let [groupName, ruleName] = fullRuleName.split('/');

            if(!ruleName) {
                groupName = 'eslint';
                ruleName = fullRuleName;
            }

            const group = groups[groupName] || {};
            groups[groupName] = group;

            group[ruleName] = value;
        }*/

        for (const group of this) {
            for (const rule of group) {
                const fullRuleName = group.getFullRuleName(rule.name);
                rule.value = config[fullRuleName] || 'off';
            }
        }

        return this;

        // console.log(groups)
        /* if (!rules) return this;

        for (const group of this) {
            for (const rule of group) {
                const fullRuleName = group.getFullRuleName(rule.ruleName, group.name);
                const recommended = (this.useRecommended
                    && group.plugin.configs
                    && group.plugin.configs.recommended
                    && group.plugin.configs.recommended.rules)
                    || {};

                rule.value = rules[fullRuleName] || recommended[fullRuleName] || 'off';
            }
        }*/
    }

    toJSON() {
        const result = {};
        for (const group of this) {
            for (const { name, value, isOn } of group) {
                if (isOn) {
                    result[group.getFullRuleName(name)] = value;
                }
            }
        }

        return result;
    }
}
