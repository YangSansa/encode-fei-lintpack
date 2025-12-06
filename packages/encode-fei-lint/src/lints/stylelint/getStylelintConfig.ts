import fs from 'fs-extra'
import glob from 'glob'
import path from 'path'
import { LinterOptions } from 'stylelint'
import { Config, PKG, ScanOptions } from '../../type'
import { STYLELINT_IGNORE_PATTERN } from '../../utils/constants'

/**
 * 获取stylelint配置
 */

export function getStylelintConfig(opts: ScanOptions, pkg: PKG, config: Config): LinterOptions {
    const { cwd, fix} = opts
    if(config.enableEslint === false) return {} as any

    const lintConfig:any = {
        fix:Boolean(fix),
        allowEmptyInput: true,
    }

    if(config.stylelintOptions){
        Object.assign(lintConfig, config.stylelintOptions)
    }else{
        const lintConfigFiles = glob.sync(`.stylelintrc.@(js|yaml|yml|json)`, { cwd })
        if(lintConfigFiles.length == 0 && !pkg.stylelint){
            lintConfig.config = {
                extends:'feicode-fei-stylelint-config'
            }
        }
    }

    const ignoreFilePath = path.resolve(cwd, '.stylelintignore')
    if(!fs.existsSync(ignoreFilePath)){
        lintConfig.ignorePattern = STYLELINT_IGNORE_PATTERN
    }

    return lintConfig

}