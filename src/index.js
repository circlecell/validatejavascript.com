import MatreshkaObject from 'matreshka/object';
import calc from 'matreshka/calc';
import lint from './lint';
import { setParser } from './lint/parser';
import Environments from './environments';
import Rules from './rules';
import Results from './results';
import configs from './lint/configs';
import codeMirror from './binders/codemirror';

module.exports = new class Application extends MatreshkaObject {
    constructor() {
        super({
            env: {},
            rules: {},
            parserOptions: {
                ecmaVersion: 2017,
                ecmaFeatures: {
                    experimentalObjectRestSpread: true
                }
            }
        })
        .set({
            configName: localStorage.eslintio ? '' : 'airbnb'
        })
        .setData(JSON.parse(localStorage.eslintio || '{}'))
        .bindNode({
            sandbox: 'form',
            configName: {
                node: ':sandbox .config-name',
                binder: {
                    initialize() {
                        for (const { name } of configs) {
                            this.appendChild(
                                Object.assign(
                                    document.createElement('option'),
                                    {
                                        innerHTML: name,
                                        value: name
                                    }
                                )
                            );
                        }
                    }
                }
            },
            code: {
                node: ':sandbox textarea',
                binder: codeMirror({
                    lineNumbers: true
                })
            },
            parserName: ':sandbox .parser-name',
            useRecommended: ':sandbox .use-recommended',
            modulesFeature: ':sandbox .modules-feature'
        })
        .instantiate({
            env: Environments,
            rules: Rules
        }, (instance, data) => instance.update(data))
        .instantiate({
            results: Results
        })
        .onDebounce({
            'change:configName change:useRecommended': () => {
                const { configName } = this;
                if (configName) {
                    const config = configs.find(({ name }) => name === configName);
                    if (!config) {
                        throw Error(`Config with name ${configName} not found`);
                    }

                    this.rules = config.config.rules;
                } else {
                    this.rules = {};
                }
            }
        }, true)
        .on({
            'submit::sandbox': (evt) => {
                evt.preventDefault();
                const results = lint(this.code, this.toJSON());

                this.set({ results });

                localStorage.eslintio = JSON.stringify(this);
            },
            'change:parserName': () => setParser(this.parserName),
            'rules@rulechange': () => {
                this.set('configName', '', { silent: true });
            },
            'click::(legend)': ({ target }) => {
                const expandable = target.parentNode.querySelector('.expandable-fieldset-content');
                if (expandable) {
                    expandable.classList.toggle('expanded');
                }
            }
        });

        calc(this, 'modulesFeature', {
            object: this.parserOptions,
            key: 'sourceType'
        }, sourceType => sourceType === 'module');

        calc(this.parserOptions, 'sourceType', {
            object: this,
            key: 'modulesFeature'
        }, modulesFeature => (modulesFeature ? 'module' : 'script'));
    }
}();
