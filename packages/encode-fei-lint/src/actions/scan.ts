import fs from 'fs-extra'
import path from 'path'
import { doPrettier, doESLint, doMarkdownlint, doStylelint } from '../lints'
import type { Config, PKG, ScanOptions, ScanReport, ScanResult } from '../type'
import { PKG_NAME } from '../utils/constants'

export default async (options: ScanOptions): Promise<ScanReport> => {
    //此处将config重命名为scanConfig
    const { cwd, fix, outputReport, config: scanConfig } = options

    //如果路径存在，导出被加载的对象
    const readConfigFile = (pth:string): any => {
        const localPath = path.resolve(cwd, pth)
        return fs.existsSync(localPath) ? require(localPath) : {}
    }

    const pkg: PKG = readConfigFile('package.json')
    const config: Config = scanConfig || readConfigFile(`${PKG_NAME}.config.js`)
    const runErrors: Error[] = []
    let results: ScanResult[] = []

    //prettier
    if(fix && config.enablePrettier !== false){
        await doPrettier(options)
    }

    //eslint
    if(config.enableEslint !== false){
        try{
            const eslintResults = await doESLint({ ...options, pkg, config })
            results = results.concat(eslintResults)
        }catch(err){
            runErrors.push(err)
        }
    }

    //stylelint
    if(config.enableStylelint !== false){
        try{
            const stylelintResults = await doStylelint({ ...options, pkg, config })
            results = results.concat(stylelintResults)
        }catch(err){
            runErrors.push(err)
        }
    }

    //markdown
    if(config.enableMarkdownlint !== false){
        try{
            const markdownlintResults = await doMarkdownlint({ ...options, pkg, config })
            results = results.concat(markdownlintResults)
        }catch(err){
            runErrors.push(err)
        }
    }

    //生成报告文件
    if(outputReport){
        const reportPath = path.resolve(process.cwd(), `./${PKG_NAME}-report.json`)
        fs.outputFile(reportPath, JSON.stringify(results, null, 2), () => {}) //如果目标文件的目录不存在，则创建目录, 再写入
    }

    return {
        results,
        errorCount: results.reduce((count, { errorCount}) => count + errorCount, 0),
        warningCount: results.reduce((count, { warningCount}) => count + warningCount, 0),
        runErrors
    }

}