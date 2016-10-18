import MatreshkaObject from 'matreshka/object';
import plugins from '../lint/plugins';

export default class extends MatreshkaObject {
    constructor(data) {
        super(data)
            .calc({
                href: {
                    source: 'ruleId',
                    handler: (ruleId) => {
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
}
