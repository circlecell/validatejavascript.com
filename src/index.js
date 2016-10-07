import MatreshkaObject from 'matreshka/object';
import lint from './lint';
import { setParser } from './lint/parser';
import Environments from './environments';
import Rules from './rules';
import Results from './results';
import configs from './lint/configs';

console.log(configs)

module.exports = new class Application extends MatreshkaObject {
    constructor() {
        super({
            env: {},
            rules: {}
        })
        .bindNode({
            sandbox: 'form',
            configName: {
                node: ':sandbox .config-name',
                binder: {
                    initialize() {
                        for(const configName of configs.map(item => item.name)) {
                            this.appendChild(
                                Object.assign(
                                    document.createElement('option'),
                                    {
                                        innerHTML: configName,
                                        value: configName
                                    }
                                )
                            );
                        }
                    }
                }
            },
            code: ':sandbox textarea',
            parserName: ':sandbox .parser-name',
            useRecommended: ':sandbox .use-recommended'
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
                if(configName) {
                    const config = configs.find(config => config.name === configName);
                    if(!config) {
                        throw Error(`Config with name ${configName} not found`);
                    }

                    this.rules = config.config.rules;
                } else {
                    this.rules = {};
                }
            }
        }, true)
        .on({
            'submit::sandbox': evt => {
                evt.preventDefault();
                const results = lint(this.code, this.toJSON());

                this.set({ results })

                console.log(results);
            },
            'change:parserName': () => setParser(this.parserName)
        });
    }
}
