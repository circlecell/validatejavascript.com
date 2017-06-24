import MatreshkaArray from 'matreshka/array';
import calc from 'matreshka/calc';
import bindNode from 'matreshka/bindnode';
import display from 'matreshka/binders/display';

export default class Messages extends MatreshkaArray {
    itemRenderer = '<pre class="result-item">{{ line }}:{{ column }} {{ type }} {{ message }} (<a href="{{ link }}" target="_blank">{{ ruleId }}</a>) </pre>';
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
                calc(self, 'type', 'severity', severity => (severity === 1 ? 'warning' : 'error'));
                calc(self, 'link', 'ruleId', (ruleId) => {
                    const [groupName, ruleName] = ruleId.split('/');
                    if (!ruleName) {
                        return `http://eslint.org/docs/rules/${groupName}`;
                    }

                    if (groupName === 'react') {
                        return `https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/${ruleName}.md`;
                    }

                    if (groupName === 'jsx-a11y') {
                        return `https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/${ruleName}.md`;
                    }

                    return null;
                });
                bindNode(self, 'type', ':sandbox', {
                    setValue(type, { node }) {
                        node.classList.add(`result-${type}`);
                    }
                });
            });
    }
}
