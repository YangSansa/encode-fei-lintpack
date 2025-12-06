#!/user/bin/env node
import path from 'path';
import fs from 'fs-extra'
import ora from 'ora';
import glob from 'glob';
import { program } from 'commander';
import spawn from 'cross-spawn'; //跨平台的子进程执行器
import { execSync } from 'child_process';
import init from './actions/init';
import scan from './actions/scan';
import update from './actions/update';
import log from './utils/log'
import printReport from './utils/print-report';
import npmType from './utils/npm-type';
import { getCommitFiles, getAmendFiles } from './utils/git';
import generateTemplate from './utils/generate-template';
import { PKG_NAME, PKG_VERSION } from './utils/constants';
import { error } from 'console';
import { check } from 'prettier';

const cwd = process.cwd();

/**
 * 若无node_modules则帮用户安装(否则会找不到config)
 */
const installDepsIfThereNo = async () => {
    const lintConfigFiles = [].concat(
        glob.sync('.eslintrc?(.@(js|yaml|yml|json))', { cwd }),
        glob.sync('.stylelintrc?(.@(js|yaml|yml|json))', { cwd }),
        glob.sync('.markdownlint(.@(js|yaml|yml|json))', { cwd }),
    )
    const nodeModulesPath = path.resolve(cwd, 'node_modules')
    if(!fs.existsSync(nodeModulesPath) && lintConfigFiles.length > 0){
        const npm = await npmType
        log.info(`使用项目Lint配置，检测到项目未安装依赖，将进行安装(执行${npm}) install`)
        execSync(`cd ${cwd} && ${npm} install`)
    }
}

program
    .version(PKG_VERSION)
    .description(`${PKG_NAME}是 杨佳菲女士为前端编码规范工程化开发 的配套 Lint 工具，提供简单的 CLI 和 Node.js API，让项目能够一键接入、一键扫描、一键修复、一键升级，并为项目配置 git commit 卡点，降低项目实施规范的成本`);

program
    .command('init')
    .description('一键接入：为项目初始化规范工具和配置，可以根据项目类型和需求进行定制')
    .option('--vscode', '写入vscode/setting配置')
    .action(async (options) => {
        if (options.vscode) {
            const configPath = path.resolve(cwd, `${PKG_NAME}.config.js`)
            generateTemplate(cwd, require(configPath), true)
        }else{
            await init({
                cwd,
                checkVersionUpdate: true
            })
        }
    })

program 
    .command('scan')
    .description('一件扫描：对项目进行代码规范问题扫描')
    .option('-q, --quiet', '只报告错误信息')
    .option('-o, --output-report', '输出扫描出的规范问题日志')
    .option('-i, --include <dirpath>', '指定要进行规范扫描的目录')
    .option('--no-ignore', '忽略 eslint 的 ignore 配置文件和 ignore 规则')
    .action(async (options) => {
        await installDepsIfThereNo()
        const checking = ora()
        checking.start(`执行 ${PKG_NAME} 代码检测`)
        const { results, errorCount, warningCount, runErrors} = await scan({
            cwd,
            fix: true,
            include: options.include || cwd,
            quiet: Boolean(options.quiet),
            outputReport: Boolean(options.outputReport),
            ignore: options.ignore //对应--no-ignore
        })
        let type = 'success'
        if(runErrors.length > 0 || errorCount > 0){
            type = 'fail'
        }else if(warningCount > 0){
            type = 'warn'
        }
        checking[type]()

        if(results.length > 0) printReport(results, false)

        //输出lint运行错误
        runErrors.forEach((err) => {
            console.log(err)
        })
    })

program
    .command('commit-msg-scan')
    .description('commit mesaage 检查: git commit 时对 commit message 进行检查')
    .action(async () => {
        const result = spawn.sync('commitlint', ['-E', 'HUSKY GIT PARAMS'], { stdio: 'inherit' })
        //同步执行系统命令，-E, --env - 从环境变量读取配置，
        // 'HUSKY GIT PARAMS' = 一个环境变量的名字，实际内容是：--edit .git/COMMIT_EDITMSG
        //得到实际命令：commitlint --edit .git/COMMIT_EDITMSG
        //用 commitlint 检查 .git/COMMIT_EDITMSG 文件里的提交信息是否合规
        //.git/COMMIT_EDITMSG 就是用户刚写的提交消息存放的文件。
        if(result.status !== 0){
            process.exit(result.status)
        }
    })


program
    .command('commit-file-scan')
    .description('代码提交检查：git commit 时对代码进行规范问题扫描')
    .option('-s, --strict', '严格模式，对 error 和 warning 问题都卡口，默认只对 error 问题卡口')
    .action(async (options) => {
        await installDepsIfThereNo()
        
        //git add检查
        const files = await getAmendFiles()
        if(files) log.warn(`[${PKG_NAME}] changes not staged for commit: \n${files}\n`)
        
        const checking = ora()
        checking.start(`执行 ${PKG_NAME} 代码提交检查`)

        const { results, errorCount, warningCount } = await scan({
            cwd,
            include:cwd,
            quiet: !options.strict,
            files: await getCommitFiles()
        })

        if(errorCount > 0 || ( options.strict && warningCount > 0)){
            checking.fail()
            printReport(results, false)
            process.exitCode = 1
        }else{
            checking.succeed()
        }
    })

program
    .command('fix')
    .description('一键修复：自动修复项目的代码规范扫描问题')
    .option('-i, --include <dirpath>', '指定要进行修复扫描的目录')
    .option('--no-ignore', '忽略 eslint 的 ignore 配置文件和 ignore 规则')
    .action(async (options) => {
        await installDepsIfThereNo()
        const checking = ora()
        checking.start(`执行 ${PKG_NAME} 代码修复`)
        const { results } = await scan({
            cwd,
            fix: true,
            include: options.include || cwd,
            ignore: options.ignore //对应--no-ignore
        })
        checking.succeed()
        if(results.length > 0) printReport(results, true)
    })


program
    .command('update')
    .description(`更新 ${PKG_NAME} 到最新版本`)
    .action(() => update(true))

program.parse(process.argv) 
// 解析命令行参数并执行对应命令的核心方法,
// process.argv 是一个数组，包含了启动 Node.js 进程时传入的命令行参数
