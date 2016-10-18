import MatreshkaArray from 'matreshka/array';
import ResultsItem from './item';

export default class Results extends MatreshkaArray {
    Model = ResultsItem;
    constructor(data, parent) {
        super()
            .bindNode('sandbox', parent.select('.results'));
    }
}
