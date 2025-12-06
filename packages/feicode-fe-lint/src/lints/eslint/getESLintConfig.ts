import { ESLint } from 'eslint';
import fs from 'fs-extra'
import glob from 'glob'
import path from 'path'
import type { Config, ScanOptions, PKG} from '../../type'
import { ESLINT_FILE_EXT } from '../../utils/constants'
import { getESLintConfigType } from './getESLintConfigType';

/**
 * 获取ESLint配置
 */
export function getESLintConfig(options: ScanOptions, config: Config, pkg: PKG): ESLint.Options {
    const { cwd, ignore, fix} = options
    const lintConfig: ESLint.Options = {
        cwd,
        fix,
        ignore,
        extensions:ESLINT_FILE_EXT,
        errorOnUnmatchedPattern:false // 当出现未匹配到文件的模式时，是否抛出错误,false是不报错，静默处理
    }
    if(config.eslintOptions){
        //若用户传入eslintOptions，则直接使用
        Object.assign(lintConfig, config.eslintOptions)
    }else{
        //根据扫描目录看是否有lintrc文件，若无则使用lint默认配置
        const lintConfigFiles = glob.sync(`.eslintrc?.@(js|yaml|yml|json)`, { cwd })
        if(lintConfigFiles.length === 0 && !pkg.eslintConfig){
            //"设置 ESLint 插件解析的根目录，让 ESLint 从指定位置而不是当前工作目录加载插件"
            lintConfig.resolvePluginsRelativeTo = path.resolve(__dirname, '../../')
            lintConfig.useEslintrc = false
            lintConfig.baseConfig = {
                extends:[
                    getESLintConfigType(cwd, pkg),
                    ...(config.enablePrettier ? ['prettier']: [])
                ]
            }
        }

        //根据扫描目录里有无ignore文件，无则使用默认ignore
        const lintIgnoreFiles = path.resolve(cwd, `.eslintignore`)
        if(!fs.existsSync(lintIgnoreFiles)){
            lintConfig.ignorePath = path.resolve(__dirname, '../config/_eslintignore.ejs')
        }
    }
    return lintConfig
    
}