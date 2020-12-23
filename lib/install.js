const runCmd = require('./runCmd');

function install(cwd, dep) {
    return runCmd('npm', ['install', ...dep], {
        cwd
    }).then(res => {
        if (res === 0) {
            return Promise.resolve();
        }
        return Promise.reject();
    });
}

module.exports = install;
