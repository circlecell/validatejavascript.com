import MatreshkaObject from 'matreshka/object';
import makeElement from 'makeelement';
import lint from './lint';
import { setParser } from './lint/parser';
import Environments from './environments';
import Rules from './rules';
import configs from './lint/configs';

console.log(configs)

module.exports = new class Application extends MatreshkaObject {
    constructor() {
        super()
            .bindNode({
                sandbox: 'form',
                configName: {
                    node: ':sandbox .config-name',
                    binder: {
                        initialize() {
                            for(const configName of Object.keys(configs)) {
                                this.appendChild(makeElement('option', {
                                    innerHTML: configName,
                                    value: configName
                                }))
                            }
                        }
                    }
                }
            })
            .instantiate({
                environments: Environments,
                rules: Rules
            }, (instance, data) => instance.update(data))
            .on({
                'change:configName': () => {
                    const { configName } = this;
                    if(configName) {
                        this.rules = configs[configName].rules;
                    } else {
                        this.rules = {};
                    }
                }
            }, true);
    }
}

setParser('babel').then(() => {
    var messages = lint(`class X {
        @eblinskyu foo = 5;
    }`, {
        ...require('../configs/eslint-config-standard.json')
    });

    console.log(messages);
});
