const Config = require('eslint/lib/config');

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

    fs.writeFileSync(`configs/${moduleName}.json`, JSON.stringify(config, null, '\t'));
}

bundleConfig('eslint-config-airbnb');
bundleConfig('eslint-config-canonical');
