import MatreshkaArray from 'matreshka/array';
import chain from 'matreshka/chain';
import html from 'matreshka/binders/html';

export default class RulesGroup extends MatreshkaArray {
    renderer = `<fieldset>
        <legend>{{ title }}</legend>
        <div class="rules-list"></div>
    </fieldset>`;
    itemRenderer = `<label title="{{ description }}">
        {{ ruleName }}: <code contenteditable class="value-json"></code>
    </label>`
    constructor({ title, rulesList }) {
        super()
            .set({ title })
            .recreate(rulesList);
    }

    onRender() {
        this
            .bindNode('container', ':sandbox .rules-list')
            .rerender();
    }

    onItemRender(item) {
        chain(item)
            .calc('valueJSON', 'value', JSON.stringify)
            .calc('value', 'valueJSON', value => value ? JSON.parse(value) : 'off')
            .bindNode('valueJSON', ':sandbox .value-json', html());
    }
}
