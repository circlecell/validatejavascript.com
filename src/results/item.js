import MatreshkaObject from 'matreshka/object';
import display from 'matreshka/binders/display';
import plugins from '../lint/plugins';

export default class extends MatreshkaObject {
    renderer = `<div class="alert alert-danger">
        {{ message }}
        <span class="rule-clarification-container">
            (<a href="{{ href }}" target="_blank">{{ ruleId }}</a>)
        </span>
    </div>`;
    constructor(data) {
        super(data)
            .calc({
                href: {
                    source: 'ruleId',
                    handler: (ruleId) => {
                        if (!ruleId) {
                            return '';
                        }

                        const splitted = ruleId.split('/');
                        let pluginName;
                        let ruleName;

                        if (splitted.length === 2) {
                            [pluginName, ruleName] = splitted;
                        } else {
                            pluginName = 'internal';
                            ruleName = ruleId;
                        }

                        const plugin = plugins.find(item => item.name === pluginName);

                        return plugin.getСlarificationURL(ruleName);
                    }
                }
            });
    }

    onRender() {
        this.bindNode('href', ':sandbox .rule-clarification-container', display());
    }
}
