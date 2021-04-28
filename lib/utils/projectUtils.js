const fs = require('fs-extra');
const os = require('os');
const path = require('path');

const cwd = process.cwd();

function getProjectPath(...filePath) {
    return path.join(cwd, ...filePath);
}

function getPackageName() {
    const packageJson = require(getProjectPath('package.json'));

    const packageNames = packageJson.name.split('/');

    return packageNames[packageNames.length - 1];
}

function writePackageJson(cwd, packageJson) {
    fs.writeFileSync(path.join(cwd, 'package.json'), JSON.stringify(packageJson, null, 2) + os.EOL);
}

module.exports = {
    getProjectPath,
    getPackageName,
    writePackageJson
};
