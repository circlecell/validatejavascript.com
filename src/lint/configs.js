const context = require.context('../../configs/', false, /.*\.json$/);
const configs = {};

context.keys().forEach(path => {
    configs[path.replace(/\.\/eslint-config-(\S+)\.json/, '$1')] = context(path);
});

export default configs;
