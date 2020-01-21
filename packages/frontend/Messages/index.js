import MatreshkaArray from 'seemple/array';
import { display } from 'seemple/binders';
import Message from './Message';

export default class Messages extends MatreshkaArray {
  get Model() { return Message; }

  constructor(data, parent) {
    super()
      .bindNode({
        sandbox: parent.select('#result-container'),
        container: ':sandbox .result-errors',
        noErrors: {
          node: ':sandbox .result-success',
          binder: display(),
        },
      });
  }
}
