require('shelljs/global');
const path = require('path')
const WEBPACK_DIR = "eslint/webpack/";
const ESLINT_DIR = 'eslint/';

function fileType(extension) {
    return function(filename) {
        return filename.substring(filename.lastIndexOf(".") + 1) === extension;
    };
}
function generateRulesIndex(basedir) {
    let output = "module.exports = function() {\n";

    output += "    var rules = Object.create(null);\n";

    find(basedir + "rules/").filter(fileType("js")).forEach(function(filename) {
        const basename = path.basename(filename, ".js");

        output += "    rules[\"" + basename + "\"] = require(\"./rules/" + basename + "\");\n";
    });

    output += "\n    return rules;\n};";
    output.to(basedir + "load-rules.js");
}

function browserify() {

    // 1. create WEBPACK_DIR and build directory
    if (!test("-d", WEBPACK_DIR)) {
        mkdir(WEBPACK_DIR);
    }


    // 2. copy files into WEBPACK_DIR directory
    cp("-r", ESLINT_DIR + "lib/*", WEBPACK_DIR);

    // 3. delete the load-rules.js file
    rm(WEBPACK_DIR + "load-rules.js");

    // 4. create new load-rule.js with hardcoded requires
    generateRulesIndex(WEBPACK_DIR);
};

browserify();
