const Jasmine = require('jasmine');
//const path = require('path');
//const { jsdom } = require('jsdom');
//const appModulePath = require('app-module-path');
//const SpecReporter = require('jasmine-spec-reporter');

const jasmine = new Jasmine();

//global.window = jsdom('<!doctype html><html><body></body></html>').defaultView;

//appModulePath.addPath(path.resolve(__dirname, '../..'));
require('babel-register')();
require('babel-polyfill');
jasmine.loadConfig({
    spec_dir: 'test/spec',
    spec_files: [
        '**/*_spec.js'
    ],
    helpers: [
        "../node_modules/babel-register/lib/node.js"
    ],
    stopSpecOnExpectationFailure: true
});

//jasmine.addReporter(new SpecReporter());

jasmine.execute();
