const fs = require('fs-extra');
const inquirer = require('inquirer');
const chalk = require('chalk');
const sortPackageJson = require('sort-package-json');

const { getProjectPath, writePackageJson } = require('../utils/projectUtils');
const getProjectConfig = require('../getProjectConfig');
const gitInit = require('../gitInit');
const copyTemplate = require('../copyTemplate');

async function createApp(appName, cwd) {
    try {
        const packageJson = getProjectConfig(appName);
        await writePackageJson(cwd, sortPackageJson(packageJson));
        await copyTemplate(cwd);
        await gitInit(cwd);

        console.log('项目初始化完毕：');
        console.log(' ');
        console.log(`   cd ${appName}`);
        console.log('   npm install');
        console.log(' ');
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

        createApp(appName, projectDir);
    } catch (error) {
        console.error(chalk.red(error));
    }
}

module.exports = create;
