const path = require('path');
const fs = require('fs-extra');

async function copyTemplate(
    cwd,
    { usePrettier = true, useEslint = true, useStylelint = true } = {}
) {
    const filterFunc = src => {
        if (!usePrettier && src.includes('prettier')) {
            return false;
        }

        if (!useEslint && src.includes('eslint')) {
            return false;
        }

        if (!useStylelint && src.includes('stylelintrc')) {
            return false;
        }
        return true;
    };
    await fs.copy(path.join(__dirname, '../template'), cwd, { filter: filterFunc });
}

module.exports = copyTemplate;
