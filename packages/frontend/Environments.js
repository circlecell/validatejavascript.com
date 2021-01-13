import MatreshkaArray from 'seemple/array';

const environments = {
  browser: 'browser global variables.',
  node: 'Node.js global variables and Node.js scoping.',
  commonjs: 'CommonJS global variables and CommonJS scoping (use this for browser',
  shared: 'node',
  es6: 'enable all ECMAScript 6 features except for modules (this automatically sets the ecmaVersion parser option to 6).',
  worker: 'web workers global variables.',
  amd: 'defines require() and define() as global variables as per the amd spec.',
  mocha: 'adds all of the Mocha testing global variables.',
  jasmine: 'adds all of the Jasmine testing global variables for version 1.3 and 2.0.',
  jest: 'Jest global variables.',
  phantomjs: 'PhantomJS global variables.',
  protractor: 'Protractor global variables.',
  qunit: 'QUnit global variables.',
  jquery: 'jQuery global variables.',
  prototypejs: 'Prototype.js global variables.',
  shelljs: 'ShellJS global variables.',
  meteor: 'Meteor global variables.',
  mongo: 'MongoDB global variables.',
  applescript: 'AppleScript global variables.',
  nashorn: 'Java 8 Nashorn global variables.',
  serviceworker: 'Service Worker global variables.',
  atomtest: 'Atom test helper globals.',
  embertest: 'Ember test helper globals.',
  webextensions: 'WebExtensions globals.',
  greasemonkey: 'GreaseMonkey globals.',
};

export default class Environments extends MatreshkaArray {
    itemRenderer = `
        <label title="{{ description }}" class="form-check-label">
            <input type="checkbox" checked="{{ checked }}"> {{ environment }}
        </label>
    `;

    constructor(data, parent) {
      super();

      for (const [environment, description] of Object.entries(environments)) {
        this.push({
          description,
          environment,
          checked: false,
        });
      }

      this
        .bindNode('sandbox', parent.select('.environments'))
        .rerender()
        .update(data);
    }

    update(env) {
      if (!env) return this;

      for (const item of this) {
        const { environment } = item;
        if (environment in env) {
          item.checked = env[environment];
        }
      }

      return this;
    }
}
