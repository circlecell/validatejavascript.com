import MatreshkaObject from 'matreshka/object';
//import prop from 'matreshka/binders/prop';

export default class Rule extends MatreshkaObject {
    renderer = `<label title="{{ dynamicValueJSON }}">
        <input type="checkbox" checked="{{ isOn }}"> {{ ruleName }}
    </label>`;
    constructor(data) {
        super(data)
            .calc({
                value: {
                    source: 'valueJSON',
                    handler: value => value ? JSON.parse(value) : 0
                },
                isOn: {
                    source: 'value',
                    handler: value => {
                        const v = value instanceof Array ? value[0] : value;
                        return v !== 0 && v !== 'off';
                    }
                },
                dynamicValue: {
                    source: ['value', 'isOn'],
                    handler: (value, isOn) => {
                        const [errorLevel, ...settings] = value instanceof Array ? value : [value];
                        let newErrorLevel;

                        if(!isOn) {
                            newErrorLevel = 'off';
                        } else if(errorLevel === 'off' || errorLevel === 0) {
                            newErrorLevel = 'error';
                        } else {
                            newErrorLevel = errorLevel;
                        }

                        return settings.length ? [newErrorLevel, ...settings] : newErrorLevel;
                    }
                },
                dynamicValueJSON: {
                    source: 'dynamicValue',
                    handler: value => JSON.stringify(value, null, '\t')
                }
            })
            .on('click::isOn', () => this.trigger('rulechange'));
    }
}
