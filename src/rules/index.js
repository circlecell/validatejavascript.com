import MatreshkaArray from 'matreshka/array';
import RulesGroup from './rules-group';
import plugins from '../lint/plugins';

export default class Rules extends MatreshkaArray {
    Model = RulesGroup;
    constructor(data, parent) {
        super()
            .bindNode({
                sandbox: parent.select('.rules')
            })
            .calc('useRecommended', {
                object: parent,
                key: 'useRecommended'
            }, null, { debounceCalc: false });

        this.recreate(plugins);
    }

    update(rules) {
        for(const group of this) {
            for(const rule of group) {
                const fullRuleName = group.getFullRuleName(rule.ruleName, group.name);
                const recommended = this.useRecommended && group.plugin.configs
                    && group.plugin.configs.recommended
                    && group.plugin.configs.recommended.rules || {};

                rule.value = rules[fullRuleName] || recommended[fullRuleName] || 'off';
            }
        }
    }

    toJSON() {
        const result = {};
        for(const group of this) {
            for(const { ruleName, value } of group) {
                result[group.getFullRuleName(ruleName, group.name)] = value;
            }
        }

        return result;
    }
}
