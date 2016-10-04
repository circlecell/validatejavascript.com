import eslint from '../../eslint/webpack/eslint';
import externalRules from './external-rules';

eslint.defineRules(externalRules);

export default function lint(code, config) {
    return eslint.verify(code, config, { filename: "foo.js" });
}