import MatreshkaArray from 'matreshka/array';
import plugins from './lint/plugins';

export default class Results extends MatreshkaArray {
    itemRenderer = `<div>
        {{ message }}
        ({{ ruleId }})
    </div>`;
    constructor(data, parent) {
        super()
            .bindNode('sandbox', parent.select('.results'))
            .calc('displayMessage', ['message', 'ruleId'], (message, ruleId) => {
                if(ruleId) {
                    const pluginName = ruleId.includes('/') ? ruleId.split('/')[0] : null;
                    const plugin = pluginName ? plugins.find(item => item.name === pluginName) : null;
                    let clarification;

                    if(plugin) {
                        const { linkToDescription } = plugin;
                        if(linkToDescription) {
                            clarification = linkToDescription(ruleId)
                        } else {
                            clarification = ruleId;
                        }
                    } else {
                        clarification = `<a href="http://eslint.org/docs/rules/${ruleId}">${ruleId}</a>`
                    }
                }

                return message;
            });
    }

}
