var CLIEngine = require("eslint").CLIEngine;

const lint = (code, {
    envs = ['browser'],
    fix =true,
    rules,
}) => new CLIEngine({
        envs,
        fix,
        rules,
        plugins: ['jsx-a11y', 'import', 'react'],
        useEslintrc: false,
        parser: "babel-eslint",
    })
    .executeOnText(code).results[0];


module.exports = (req, res) => {
    const { code, rules } = req.body;

    try {  lint(code, { rules }) } catch(e) { console.log(e)}

    res.json({
        payload: {}//lint(code, { rules })
    })
}
