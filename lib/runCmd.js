const { spawn } = require('child_process');

function runCmd(cmd, args, options = {}) {
    return new Promise((resolve, reject) => {
        const child = spawn(cmd, args, {
            stdio: 'inherit',
            ...options
        });

        child.on('close', code => {
            resolve(code);
        });

        child.on('error', err => {
            reject(err);
        });
    });
}

module.exports = runCmd;
