import MatreshkaArray from 'matreshka/array';
import environments from './lint/environments';

export default class Environments extends MatreshkaArray {

    itemRenderer = `
        <label title="{{description}}">
            <input type="checkbox" checked="{{checked}}"> {{environment}}
        </label>
    `;
    constructor(data, parent) {
        super();

        for(const [environment, description] of Object.entries(environments)) {
            this.push({
                description,
                environment,
                checked: false
            });
        }

        this
            .bindNode('sandbox', parent.select('.environments'))
            .rerender();
    }
    toJSON() {
        const result = {};

        for (const { environment, checked } of this) {
            result[environment] = checked;
        }

        return result;
    }

    update(data) {
        console.log(data);
        return this;
    }
}
