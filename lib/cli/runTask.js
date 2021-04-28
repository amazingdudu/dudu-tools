const path = require('path');
const runCmd = require('../runCmd');

function runTask(type) {
    const args = [
        '--gulpfile',
        path.resolve(__dirname, '../gulpfile.js'),
        '--cwd',
        process.cwd(),
        type
    ];

    runCmd('gulp', args);
}

module.exports = runTask;
