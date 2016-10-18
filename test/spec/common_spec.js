/* eslint-disable import/no-dynamic-require */
import fs from 'fs';
import path from 'path';
import lint from '../../src/lint';

describe('Common', () => {
    it('does not warn about nonexisting rules', () => {
        const configsFolder = path.resolve(__dirname, '../../src/lint/configs');
        for (const configPath of fs.readdirSync(configsFolder)) {
            const config = require(path.resolve(configsFolder, configPath));

            for (const { message } of lint('const foo = "bar"', config)) {
                expect(/Definition for rule '(.*)' was not found/.test(message))
                    .toEqual(false, `Unexpected eslint message using ${configPath}: "${message}"`);
            }
        }
    });
});
