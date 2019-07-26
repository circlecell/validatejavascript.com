const { CLIEngine } = require('eslint');
const stripAnsi = require('strip-ansi');

const lint = (code, {
  envs,
  fix,
  rules,
}) => new CLIEngine({
  envs,
  fix,
  rules,
  plugins: ['jsx-a11y', 'import', 'react'],
  useEslintrc: false,
  parser: 'babel-eslint',
  cwd: __dirname,
})
  .executeOnText(code).results[0];

module.exports = (req, res) => {
  const {
    code, rules, envs, fix,
  } = req.body;
  const result = lint(code, { rules, envs, fix });

  result.messages.forEach((message) => {
    // eslint-disable-next-line no-param-reassign
    message.message = stripAnsi(message.message);
  });

  res.json({
    payload: result,
  });
};
