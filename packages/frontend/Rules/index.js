import MatreshkaArray from 'matreshka/array';
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
        if (isOn) {
          result[group.getFullRuleName(name)] = value;
        }
      }
    }

    return result;
  }
}
