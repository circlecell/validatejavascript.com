import 'babel-polyfill';

import MatreshkaObject from 'matreshka/object';
import codeMirror from 'matreshka-binder-codemirror';
import 'codemirror/mode/javascript/javascript';

import Rules from './Rules';
import Messages from './Messages';
import Environments from './Environments';

module.exports = new class App extends MatreshkaObject {
    constructor() {
        super()
            .set({
                configName: 'airbnb',
                noErrors: false,
            })
            .bindSandbox('body')
            .bindNode({
                configName: ':sandbox .config-name',
                form: ':sandbox #main',
                code: {
                    node: ':sandbox #code',
                    binder: codeMirror({
                        lineNumbers: true
                    })
                },
            })
            .calc('chosenConfig', ['configName', 'configs'], (configName, configs) => {
                if(!configName || !configs) {
                    return {};
                }

                return configs[configName];
            })
            .on('change:chosenConfig', () => this.rules.update(this.chosenConfig), {
                triggerOnInit: true
            })
            .on({
                'submit::form': (evt) => {
                    evt.preventDefault();
                    this.lint();
                },
                'change:code': () => {
                    this.noErrors = false;
                }
            })
            .instantiate({
                rules: Rules,
                messages: Messages,
                environments: Environments
            })
            .init()

        this.messages.calc('noErrors', { object: this, key: 'noErrors' });
    }

    async init() {
        const { payload: { rulesList, configs } } = await ( await fetch('/api/init') ).json();

        this.configs = configs;

        this.rules.recreate(Object.entries(rulesList).map(([pluginName, value]) => ({
            pluginName,
            rules: value.map(name => ({ name, value: 'off' }))
        })))
    }

    async lint() {
        if(!this.code) {
            this.messages = [{
                message: 'Code field value cannot be an empty string',
                line: 1,
                column: 1
            }]

            return this;
        }

        const { payload: { messages, output } } = await( await fetch('/api/lint', {
            method: 'post',
            body: JSON.stringify({
                code: this.code,
                rules: this.rules,
                envs: this.environments.toJSON(false).filter(({ checked }) => checked).map(({ environment }) => environment)
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })).json();

        if(output) {
            this.code = output;
        }

        this.messages = messages;
        this.noErrors = !messages.length;

        return this;
    }
}
