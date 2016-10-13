import MatreshkaArray from 'matreshka/array';
import Rule from './rule';

export default class RulesGroup extends MatreshkaArray {
    Model = Rule;

    renderer = `<fieldset>
        <legend>{{ name }}</legend>
        <div class="rules-list"></div>
    </fieldset>`;

    constructor(plugin) {
        super()
            .set(plugin);

        const { plugin: { rules } } = plugin;
        for(const ruleName of Object.keys(rules)) {
            this.push({
                ruleName,
                value: 'off'
            });
        }
    }

    onRender() {
        this
            .bindNode('container', ':sandbox .rules-list')
            .rerender();
    }
}
