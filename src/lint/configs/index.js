const names = ['airbnb', 'eslint', 'google', 'standard'];
const configs = [];

for(const name of names) {
    const config = {
        ...require(`./eslint-config-${name}.json`)
    };

    configs.push({ name, config });
}

export default configs;
