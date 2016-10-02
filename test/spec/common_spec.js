import lint from '../../src/lint';
import fs from 'fs';
import path from 'path';

describe('Common', () => {
    it('does not warn about nonexisting rules', () => {
        const configsFolder = path.resolve(__dirname, '../../configs');
        for(const configPath of fs.readdirSync(configsFolder)) {
            const config = require(path.resolve(configsFolder, configPath));

            for(const { message } of lint('const foo = "bar"', config)) {
                expect(/Definition for rule '(.*)' was not found/.test(message))
                    .toEqual(false, `Unexpected eslint message using ${configPath}: "${message}"`);
            }
        }
    });
});
