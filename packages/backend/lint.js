var CLIEngine = require("eslint").CLIEngine;
const airbnb = require('eslint-config-airbnb');

//console.log(require('eslint-plugin-react'))

// console.log(require("eslint/conf/eslint-all"))
//console.log(airbnb)

//console.log()



//cli.addPlugin();

// lint the supplied text and optionally set
// a filename that is displayed in the report

//

//console.log(require('eslint-plugin-react'))

//console.log(require('eslint/lib/load-rules')())
module.exports = (code, {
    envs = ['browser'],
    fix,
    rules,
}) => new CLIEngine({
        envs,
        fix,
        plugins: ['jsx-a11y', 'import', 'react'],
        useEslintrc: false,
        parser: "babel-eslint",
        rules: /*getRules(require("eslint/conf/eslint-all"))*/getRules(airbnb)
    })
    .executeOnText(code);
