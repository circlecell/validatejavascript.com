const names = ['airbnb', 'eslint', 'google', 'standard'];
const configs = [];

for(const name of names) {
    configs.push({
        name,
        config: require(`./eslint-config-${name}.json`)
    });
}

export default configs;
