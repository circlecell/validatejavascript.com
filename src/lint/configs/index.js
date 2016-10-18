const names = ['airbnb', 'eslint', 'google', 'standard', 'xo'];
const configs = [];

for (const name of names) {
    const config = {
        ...require(`./eslint-config-${name}.json`) // eslint-disable-line import/no-dynamic-require
    };

    configs.push({ name, config });
}

export default configs;
