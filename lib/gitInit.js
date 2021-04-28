const runCmd = require('./runCmd');

function gitInit(cwd) {
    return runCmd('git', ['init'], {
        cwd,
        stdio: 'ignore'
    });
}

module.exports = gitInit;
