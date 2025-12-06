import path from 'path';
import fs from 'fs-extra'
import _ from 'lodash';
import glob from 'glob'
import ejs from 'ejs'

import {
    ESLINT_IGNORE_PATTERN,
    STYLELINT_FILE_EXT,
    STYLELINT_IGNORE_PATTERN,
    MARKDOWNLINT_IGNORE_PATTERN
} from './constants'
import stylelint from 'stylelint';
import markdownlint from 'markdownlint';

/**
 * vscode 配置合并
 * @param filepath
 * @param content
 */

const mergeVSCodeConfig = (filepath: string, content: string) => {
    //不需要merge
    if(!fs.existsSync(filepath)) {
        return content
    }
    try {
        const targetData = fs.readJSONSync(filepath)
        const sourceData = JSON.parse(content)
        //Array.isArray检查数据是不是一个数组
        return JSON.stringify(
            _.mergeWith(targetData, sourceData, (target, source) =>{
                if(Array.isArray(target) && Array.isArray(source)) {
                        return [...new Set(target.concat(source))]
                    }
                },
                null,
                2
            )
        )
    }catch(e){
        return ''
    }
}

/**
 * 实例化模板
 * @param cwd
 * @param data
 * @param vscode
 */
//Record<K, T> 工具类型 
// Record 是 TypeScript 内置的工具类型
// 语法：Record<Keys, Type>
// 创建一个对象类型，其键为 Keys，值为 Type
export default (cwd: string, data: Record<string,any>, vscode?: boolean) => {
    const templatePath = path.join(__dirname, '../config')
    //glob.sync() = 同步读取文件
    //如果 vscode 为 true：只找 _vscode/ 目录下的模板，这是用户的选择
    //如果 vscode 为 false：找所有目录下的模板
    const templates = glob.sync(`${vscode ? '_vscode':'**'}/*.ejs`, {cwd: templatePath}) //用户有的
    for(const name of templates) {
        const filepath = path.resolve(cwd, name.replace(/\.ejs$/, '').replace(/^_/, '.')) 
        //ejs.render() = 用数据填充模板，生成最终文件
        let content = ejs.render(fs.readFileSync(path.resolve(templatePath, name), 'utf8'), {
            eslintIgnores: ESLINT_IGNORE_PATTERN,
            stylelintExt: STYLELINT_FILE_EXT,
            stylelintIgnores: STYLELINT_IGNORE_PATTERN,
            markdownlintIgnores: MARKDOWNLINT_IGNORE_PATTERN,
            ...data 
        }) 

        //合并vscode config
        //如果是 VS Code 配置文件，进行合并而不是覆盖
        if(/^_vscode/.test(name)) {
            content = mergeVSCodeConfig(filepath, content) 
        }

        //跳过空文件
        if(!content.trim()) continue

        fs.outputFileSync(filepath, content, 'utf8')  //这行代码是 同步写入文件，并且会自动创建不存在的目录！
    }
}
