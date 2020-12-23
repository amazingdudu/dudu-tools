#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const { version } = require('../package.json');
const runTask = require('../lib/cli/runTask');
const create = require('../lib/cli/create');

program.version(version, '-v, --version');

program
    .command('create <dir>')
    .description('创建项目')
    .action(dir => {
        create(dir);
    })
    .on('--help', () => {
        console.log('');
        console.log('Examples:');
        console.log(chalk.greenBright('dudu create my-ui-components'));
        console.log('');
        console.log('');
    });

program
    .command('run <type>')
    .description('执行gulp任务')
    .action(type => {
        runTask(type);
    })
    .on('--help', () => {
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
