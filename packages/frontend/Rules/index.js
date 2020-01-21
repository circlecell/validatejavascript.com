import MatreshkaArray from 'seemple/array';
import RulesGroup from './RulesGroup';

export default class Rules extends MatreshkaArray {
  get Model() { return RulesGroup; }

  constructor(data, parent) {
    super()
      .bindNode({
        sandbox: parent.select('.rules'),
      })
      .on({
        '*.*@rulechange': () => {
          this.trigger('rulechange');
        },
      });
  }

  update(config) {
    for (const group of this) {
      for (const rule of group) {
        const fullRuleName = group.getFullRuleName(rule.name);
        rule.value = config[fullRuleName] || 'off';
      }
    }

    return this;
  }

  toJSON() {
    const result = {};
    for (const group of this) {
      for (const { name, value, isOn } of group) {
        let val = value instanceof Array ? value[0] : value;
        // force error value if a rule is on
        val = (val === 'off' || val === 0) && isOn ? 'error' : value;

        if (isOn) {
          result[group.getFullRuleName(name)] = val;
        }
      }
    }

    return result;
  }
}
