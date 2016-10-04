import MatreshkaArray from 'matreshka/array';
import RulesGroup from './rules-group';
import plugins from '../lint/plugins';
import internalRules from '../lint/internal-rules';

export default class Rules extends MatreshkaArray {

    Model = RulesGroup;
    constructor(data, parent) {
        const allRules = Object.keys(internalRules);

        super()
            .bindNode({
                sandbox: parent.select('.rules')
            });

        this.push({
            title: 'Internal',
            prefix: null,
            rulesList: Object.keys(internalRules).map(ruleName => ({
                ruleName,
                fullRuleName: ruleName
            }))
        });

        for(const [pluginName, { rules }] of Object.entries(plugins)) {
            this.push({
                title: pluginName,
                prefix: pluginName,
                rulesList: Object.keys(rules).map(ruleName => {
                    const fullRuleName = `${pluginName}/${ruleName}`;

                    allRules.push(fullRuleName);

                    return { ruleName, fullRuleName };
                })
            });
        }

        this.set({ allRules });
    }

    update(rules) {
        for(const group of this) {
            for(const rule of group) {
                rule.value = rules[rule.fullRuleName] || 'off';
            }
        }
    }

    toJSON() {
        const result = {};
        for(const group of this) {
            for(const { fullRuleName, value } of group) {
                result[fullRuleName] = value;
            }
        }

        return result;
    }
}
