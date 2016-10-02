
var babylonToEspree = require("babel-eslint/babylon-to-espree");
var pick            = require("lodash.pickby");
var parse           = require("babylon").parse;
var t               = require("babel-types");
var tt              = require("babylon").tokTypes;
var traverse        = require("babel-traverse").default;

var hasPatched = false;
var eslintOptions = {};

exports.parse = function (code, options) {
    options = options || {};
  var opts = {
    sourceType: options.sourceType,
    allowImportExportEverywhere: options.allowImportExportEverywhere, // consistent with espree
    allowReturnOutsideFunction: true,
    allowSuperOutsideMethod: true,
    plugins: [
      "flow",
      "jsx",
      "asyncFunctions",
      "asyncGenerators",
      "classConstructorCall",
      "classProperties",
      "decorators",
      "doExpressions",
      "exponentiationOperator",
      "exportExtensions",
      "functionBind",
      "functionSent",
      "objectRestSpread",
      "trailingFunctionCommas"
    ]
  };

  var ast;
  try {
    ast = parse(code, opts);
  } catch (err) {
    if (err instanceof SyntaxError) {
      err.lineNumber = err.loc.line;
      err.column = err.loc.column + 1;

      // remove trailing "(LINE:COLUMN)" acorn message and add in esprima syntax error message start
      err.message = "Line " + err.lineNumber + ": " + err.message.replace(/ \((\d+):(\d+)\)$/, "");
    }

    throw err;
  }

  // remove EOF token, eslint doesn't use this for anything and it interferes with some rules
  // see https://github.com/babel/babel-eslint/issues/2 for more info
  // todo: find a more elegant way to do this
  ast.tokens.pop();

  // convert tokens
  ast.tokens = babylonToEspree.toTokens(ast.tokens, tt, code);

  // add comments
  babylonToEspree.convertComments(ast.comments);

  // transform esprima and acorn divergent nodes
  babylonToEspree.toAST(ast, traverse, code);

  // remove File
  ast.type = "Program";
  ast.sourceType = ast.program.sourceType;
  ast.directives = ast.program.directives;
  ast.body = ast.program.body;
  delete ast.program;
  delete ast._paths;

  babylonToEspree.attachComments(ast, ast.comments, ast.tokens);

  return ast;
};
