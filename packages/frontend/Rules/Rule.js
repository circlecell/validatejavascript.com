import MatreshkaObject from 'seemple/object';

export default class Rule extends MatreshkaObject {
    renderer = ({ docs, name }) => `<label
        title="${docs.description || ''}"
        class="col-md-4 col-sm-6 col-xs-12 form-check-label"
    >
        <input
            title="{{ dynamicValueJSON }}"
            type="checkbox"
            checked="{{ isOn }}"
        >
        ${name}
    </label>`;

    constructor(data) {
      super(data)
        .calc({
          value: {
            source: 'valueJSON',
            handler: (value) => (value ? JSON.parse(value) : 0),
          },
          isOn: {
            source: 'value',
            handler: (value) => {
              const v = value instanceof Array ? value[0] : value;
              return v !== 0 && v !== 'off';
            },
          },
          dynamicValue: {
            source: ['value', 'isOn'],
            handler: (value, isOn) => {
              const [errorLevel, ...settings] = value instanceof Array ? value : [value];
              let newErrorLevel;

              if (!isOn) {
                newErrorLevel = 'off';
              } else if (errorLevel === 'off' || errorLevel === 0) {
                newErrorLevel = 'error';
              } else {
                newErrorLevel = errorLevel;
              }

              return settings.length ? [newErrorLevel, ...settings] : newErrorLevel;
            },
          },
          dynamicValueJSON: {
            source: 'dynamicValue',
            handler: (value) => JSON.stringify(value, null, '\t'),
          },
        })
        .on('click::isOn', () => this.trigger('rulechange'));
    }
}
