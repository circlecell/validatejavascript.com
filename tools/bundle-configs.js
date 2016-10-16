const Config = require('eslint/lib/config');
const rimraf = require('rimraf');

function bundleConfig(moduleName) {
    const { useSpecificConfig: config } = new Config({
        configFile: require.resolve(moduleName),
        useEslintrc: false
    });

    const fs = require('fs');
    for(let key in config.rules) {
        if(key.indexOf('import/') === 0) {
            delete config.rules[key];
        }
    }

    delete config.extends;
    delete config.globals;
    delete config.env;
    delete config.plugins;

    fs.writeFileSync(`src/lint/configs/${moduleName}.json`, JSON.stringify(config, null, '\t'));
}

rimraf.sync('src/lint/configs/*.json');

['airbnb', 'eslint', 'google', 'standard', 'xo']
    .map(item => `eslint-config-${item}`)
    .forEach(bundleConfig);
