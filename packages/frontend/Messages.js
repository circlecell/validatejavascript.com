import MatreshkaArray from 'matreshka/array';
import calc from 'matreshka/calc';
import bindNode from 'matreshka/bindnode';
import display from 'matreshka/binders/display';

export default class Messages extends MatreshkaArray {
    itemRenderer = `<pre class="result-item">{{ line }}:{{ column }} {{ type }} {{ message }}</pre>`;
    constructor(data, parent) {
        super()
            .bindNode({
                sandbox: parent.select('#result-container'),
                container: ':sandbox .result-errors',
                noErrors: {
                    node: ':sandbox .result-success',
                    binder: display()
                }
            })
            .on('*@render', ({ self }) => {
                calc(self, 'type', 'severity', severity => severity === 1 ? 'warning' : 'error');
                bindNode(self, 'type', ':sandbox', {
                    setValue(type, { node }) {
                        node.classList.add(`result-${type}`);
                    }
                });
            });
    }
}
