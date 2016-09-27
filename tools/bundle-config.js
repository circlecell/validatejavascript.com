/*function getConfig(moduleName) {
    const module = require(moduleName);


}


console.log(getConfig('eslint-config-airbnb'));*/

const Config = require('eslint/lib/config');

const config = new Config({
    configFile: require.resolve('eslint-config-airbnb'),
    useEslintrc: false
});

const fs = require('fs');
//console.log(JSON.stringify(config.rules));
for(let key in config.useSpecificConfig.rules) {
    if(key.indexOf('import/') === 0) {
        delete config.useSpecificConfig.rules[key];
    }
}
fs.writeFileSync('bundled-config.json', JSON.stringify(config.useSpecificConfig));
