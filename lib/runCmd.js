const { spawn } = require('child_process');

function runCmd(cmd, args, cb) {
    const child = spawn(cmd, args, {
        stdio: 'inherit'
    });
    child.on('close', function (code) {
        if (cb) cb(code);
    });
}

module.exports = runCmd;