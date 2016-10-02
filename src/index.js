import lint from './lint';
import { setParser } from './lint/parser';

setParser('babel').then(() => {
    var messages = lint(`class X {
        @eblinskyu foo = 5;
    }`, {
        ...require('../configs/eslint-config-standard.json')
    });

    console.log(messages);
});
