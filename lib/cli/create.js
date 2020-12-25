const fs = require('fs-extra');
const inquirer = require('inquirer');
const chalk = require('chalk');
const sortPackageJson = require('sort-package-json');

const { getProjectPath, writePackageJson } = require('../utils/projectUtils');
const initProjectConfig = require('../initProjectConfig');
const gitInit = require('../gitInit');
const install = require('../install');
const initConfig = require('../initConfig');

async function prompt() {
    const res = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'usePrettier',
            message: '是否使用 prettier 格式化代码？'
        },
        {
            type: 'confirm',
            name: 'useEslint',
            message: '是否使用 eslint 检测JavaScript、Typescript？'
        },
        {
            type: 'confirm',
            name: 'useStylelint',
            message: '是否使用 stylelint 检测css、less？'
        }
    ]);
    return res;
}

async function createApp(appName, cwd, useDefault) {
    try {
        let options;
        if (!useDefault) {
            options = await prompt();
        }
        const { packageJson, devDependencies } = initProjectConfig({ appName, ...options });

        writePackageJson(cwd, sortPackageJson(packageJson));
        initConfig(cwd, options);
        gitInit(cwd);
        install(cwd, devDependencies);
    } catch (error) {
        console.log(chalk.red(error));
    }
}

async function create(dir) {
    const appName = dir;
    const projectDir = getProjectPath(dir);

    try {
        const exists = await fs.pathExists(projectDir);

        if (exists) {
            const coverRes = await inquirer.prompt({
                type: 'confirm',
                name: 'cover',
                message: '文件目录已存在，是否覆盖？'
            });
            if (!coverRes.cover) {
                process.exit(0);
            }
            await fs.emptyDir(projectDir);
        }
        await fs.mkdirp(projectDir);

        const defaultRes = await inquirer.prompt({
            type: 'confirm',
            name: 'default',
            message: '是否使用默认配置'
        });

        createApp(appName, projectDir, defaultRes.default);
    } catch (error) {
        console.error(chalk.red(error));
    }
}

module.exports = create;
