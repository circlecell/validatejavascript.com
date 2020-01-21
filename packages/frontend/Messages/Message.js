import MatreshkaObject from 'seemple/object';
import { display } from 'seemple/binders';

export default class Message extends MatreshkaObject {
  renderer = '<pre class="result-item"><span class="position" title="Go to the line">{{ line }}:{{ column }}</span> {{ type }} {{ message }} <span class="result-link">(<a href="{{ link }}" target="_blank">{{ ruleId }}</a>)</span> </pre>';

  constructor(data) {
    super(data)
      .calc('type', 'severity', (severity) => (severity === 1 ? 'warning' : 'error'))
      .calc('link', 'ruleId', (ruleId) => {
        if (!ruleId) {
          return null;
        }

        const [groupName, ruleName] = ruleId.split('/');

        if (!ruleName) {
          return `http://eslint.org/docs/rules/${groupName}`;
        }

        if (groupName === 'react') {
          return `https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/${ruleName}.md`;
        }

        if (groupName === 'jsx-a11y') {
          return `https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/${ruleName}.md`;
        }

        return null;
      });
  }

  onRender() {
    this
      .bindNode('type', ':sandbox', {
        setValue(type, { node }) {
          node.classList.add(`result-${type}`);
        },
      })
      .bindNode('link', ':sandbox .result-link', display());
  }
}
