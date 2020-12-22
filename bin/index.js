#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const version = require('../package.json').version;
const runTask = require('../lib/cli/runTask');

program.version(version, '-v, --version');

program
    .command('init')
    .description('初始化项目')
    .action(function () {
        jsv();
    })
    .on('--help', function () {
        console.log('');
        console.log('Examples:');
        console.log(chalk.greenBright('dudu init'));
        console.log('');
        console.log('');
    });

program
    .command('run <type>')
    .description('编译')
    .action(function (type) {
        runTask(type);
    })
    .on('--help', function () {
        console.log('');
        console.log('Examples:');
        console.log(chalk.greenBright('dudu run compile'));
        console.log(chalk.greenBright('dudu run compile:less'));
        console.log('');
        console.log('');
    });

program.parse(process.argv);

if (!program.args[0]) {
    program.help();
}
