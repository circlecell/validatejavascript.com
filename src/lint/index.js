import eslint from '../../eslint/webpack/eslint';

export default function lint(code, config) {
    return eslint.verify(code, config, { filename: "foo.js" });
}
