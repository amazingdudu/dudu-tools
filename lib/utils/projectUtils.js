const path = require('path');

const cwd = process.cwd();

function getProjectPath(...filePath) {
    return path.join(cwd, ...filePath);
}

function getPackageName() {
    const pkg = require(getProjectPath('package.json'));

    const packageNames = pkg.name.split('/');

    return packageNames[packageNames.length - 1];
}

module.exports = {
    getProjectPath,
    getPackageName
};
