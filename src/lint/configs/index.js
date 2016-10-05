const context = require.context('./', false, /.*\.json$/);
const configs = [];

context.keys().forEach(path => {
    const name = path.replace(/\.\/eslint-config-(\S+)\.json/, '$1');
    configs.push({
        name,
        config: context(path)
    });
});

export default configs;
