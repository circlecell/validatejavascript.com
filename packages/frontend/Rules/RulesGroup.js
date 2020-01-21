import MatreshkaArray from 'seemple/array';
import Rule from './Rule';

export default class RulesGroup extends MatreshkaArray {
  get Model() { return Rule; }

    renderer = `<fieldset>
        <legend>Rules: {{ pluginName }}</legend>
        <div class="rules-list"></div>
    </fieldset>`;

    constructor(plugin) {
      super()
        .set(plugin)
        .recreate(plugin.rules)
        .rerender();
    }

    onRender() {
      this
        .bindNode('container', ':sandbox .rules-list')
        .rerender();
    }

    getFullRuleName(ruleName) {
      if (this.pluginName === 'eslint') {
        return ruleName;
      }

      return `${this.pluginName}/${ruleName}`;
    }
}
