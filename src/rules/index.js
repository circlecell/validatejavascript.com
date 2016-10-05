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

        for(const { name, plugin: { rules } } of plugins) {
            this.push({
                title: name,
                prefix: name,
                rulesList: Object.keys(rules).map(ruleName => {
                    const fullRuleName = `${name}/${ruleName}`;

                    allRules.push(fullRuleName);

                    return { ruleName, fullRuleName };
                })
            });
        }

        this.set({ allRules });
    }

    update(rules) {//console.log(yomanarod);
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
