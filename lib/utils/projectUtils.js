const path = require('path');

const cwd = process.cwd();

function getProjectPath(...filePath) {
    return path.join(cwd, ...filePath);
}

const packageJson = require(getProjectPath('package.json'));

function getPackageName() {
    const packageNames = packageJson.name.split('/');

    return packageNames[packageNames.length - 1];
}

module.exports = {
    getProjectPath,
    getPackageName,
    packageJson
};
