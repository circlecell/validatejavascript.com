var CLIEngine = require("eslint").CLIEngine;
const airbnb = require('eslint-config-airbnb');

//console.log(airbnb)

//console.log()

function getRules(config) {
    const rules = {};
    if(config.rules) {
        Object.assign(rules, config.rules);
    }

    if(config.extends) {
        for(const configPath of config.extends) {
            Object.assign(rules, getRules(require(configPath)))
        }
    }

    return rules;
}

var cli = new CLIEngine({
    envs: ["browser", "mocha"],
    useEslintrc: false,
    fix: true,
    parser: "babel-eslint",
    rules: getRules(airbnb)
});

//cli.addPlugin();

// lint the supplied text and optionally set
// a filename that is displayed in the report
var report = cli.executeOnText("var foo = <yolki     />;", "foo.js");


console.log(report.results[0])
