import MatreshkaArray from 'matreshka/array';
import ResultsItem from './item';

export default class Results extends MatreshkaArray {
    itemRenderer = `<div class="alert alert-danger">
        {{ message }}
        (<a href="{{ href }}" target="_blank">{{ ruleId }}</a>)
    </div>`;
    Model = ResultsItem;
    constructor(data, parent) {
        super()
            .bindNode('sandbox', parent.select('.results'));
    }
}
