import MatreshkaArray from 'matreshka/array';
import chain from 'matreshka/chain';
import html from 'matreshka/binders/html';

export default class RulesGroup extends MatreshkaArray {
    renderer = `<fieldset>
        <legend>{{ name }}</legend>
        <div class="rules-list"></div>
    </fieldset>`;
    itemRenderer = `<label>
        {{ ruleName }}: <code contenteditable class="value-json"></code>
    </label>`
    constructor(plugin) {
        super()
            .set(plugin)
            //.recreate();
        const { plugin: { rules } } = plugin;
        for(const ruleName of Object.keys(rules)) {
            //console.log(rules);
            this.push({
                ruleName,
                value: 0
            });
        }
    }

    onRender() {
        this
            .bindNode('container', ':sandbox .rules-list')
            .rerender();
    }

    onItemRender(item) {
        chain(item)
            .calc('valueJSON', 'value', JSON.stringify)
            .calc('value', 'valueJSON', value => value ? JSON.parse(value) : 0)
            .bindNode('valueJSON', ':sandbox .value-json', html());
    }
}
