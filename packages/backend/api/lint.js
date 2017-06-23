const CLIEngine = require('eslint').CLIEngine;
const stripAnsi = require('strip-ansi');

const lint = (code, {
    envs,
    fix = true,
    rules
}) => new CLIEngine({
    envs,
    fix,
    rules,
    plugins: ['jsx-a11y', 'import', 'react'],
    useEslintrc: false,
    parser: 'babel-eslint'
})
    .executeOnText(code).results[0];

module.exports = (req, res) => {
    const { code, rules, envs } = req.body;
    const result = lint(code, { rules, envs });

    result.messages.forEach((message) => {
        // eslint-disable-next-line no-param-reassign
        message.message = stripAnsi(message.message);
    });

    res.json({
        payload: result
    });
};
