import eslint from '../eslint/build/eslint';

var messages = eslint.verify("var ff oo;", {
    rules: {
        semi: 2
    }
}, { filename: "foo.js" });

console.log(messages);
