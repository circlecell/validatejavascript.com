import 'babel-polyfill';

import MatreshkaObject from 'seemple/object';
import { display } from 'seemple/binders';
import codeMirror from 'codemirror-binder';
import 'codemirror/mode/jsx/jsx';

import Rules from './Rules';
import Messages from './Messages';
import Environments from './Environments';

export default new class App extends MatreshkaObject {
  constructor() {
    super()
      .set({
        configName: JSON.parse(localStorage.configName || '"airbnb"'),
        fix: JSON.parse(localStorage.fix || 'true'),
        noErrors: false,
      })
      .bindSandbox('body')
      .bindNode({
        configName: ':sandbox .config-name',
        fix: [{
          node: ':sandbox .autofix',
        },
        {
          node: ':sandbox .and-fix-button-text',
          binder: display(),
        },
        ],
        form: ':sandbox #main',
        code: {
          node: ':sandbox #code',
          binder: codeMirror({
            lineNumbers: true,
            mode: 'jsx',
          }),
        },
      })
      .set({
        editor: this.nodes.code.nextElementSibling.CodeMirror,
      })
      .calc('chosenConfig', ['configName', 'configs'], (configName, configs) => {
        if (!configName || !configs) {
          return {};
        }

        return configs[configName];
      })
      .on('change:chosenConfig', () => this.rules.update(this.chosenConfig), {
        triggerOnInit: true,
      })
      .on({
        'submit::form': (evt) => {
          evt.preventDefault();
          this.lint();
        },
        'change:code': () => {
          this.noErrors = false;
        },
        'messages.*@click::(.position)': ({ self: { line, column } }) => {
          this.editor.setCursor({ line: line - 1, ch: column - 1 });
          this.editor.focus();
        },
      })
      .onDebounce('rules@rulechange change:configName change:fix', ({ skipStorage } = {}) => {
        if (skipStorage) return;
        localStorage.rules = JSON.stringify(this.rules);
        localStorage.configName = JSON.stringify(this.configName);
        localStorage.fix = JSON.stringify(this.fix);
      }, 200)
      .instantiate({
        rules: Rules,
        messages: Messages,
        environments: Environments,
      })
      .init();

    this.editor.addKeyMap({
      'Ctrl-Enter': () => this.lint(),
      'Cmd-Enter': () => this.lint(),
      'Cmd-A': (inst) => inst.execCommand('selectAll'),
    });

    this.messages.calc('noErrors', { object: this, key: 'noErrors' });
  }

  async init() {
    const { payload: { rulesList, configs } } = await (await fetch('/api/init')).json();

    this.configs = configs;

    this.rules.recreate(Object.entries(rulesList).map(([pluginName, value]) => ({
      pluginName,
      rules: value.map(({ name, docs }) => ({ name, docs, value: 'off' })),
    })));

    if (localStorage.rules) {
      setTimeout(() => this.rules.update(JSON.parse(localStorage.rules)));
    }
  }

  async lint() {
    if (!this.code) {
      this.messages = [{
        message: 'Code field value cannot be an empty string',
        line: 1,
        column: 1,
      }];

      return this;
    }

    const { payload: { messages, output } } = await (await fetch('/api/lint', {
      method: 'post',
      body: JSON.stringify({
        code: this.code,
        rules: this.rules,
        fix: this.fix,
        envs: this.environments.toJSON(false)
          .filter(({ checked }) => checked)
          .map(({ environment }) => environment),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })).json();

    if (output) {
      this.code = output;
    }

    this.messages = messages;
    this.noErrors = !messages.length;

    return this;
  }
}();
