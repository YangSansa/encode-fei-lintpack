import fg from 'fast-glob'
import { readFile, writeFile } from 'fs-extra'
import { extname, join } from 'path'
import prettier from 'prettier'
import { ScanOptions } from '../../type'
import { PRETTIER_FILE_EXT, PRETTIER_IGNORE_PATTERN } from '../../utils/constants'

export interface DoPrettierOptions extends ScanOptions {}

export async function doPrettier(options: DoPrettierOptions) {
    let files: string[] = []  //存放需要格式化的文件
    if(options.files) {
        files = options.files.filter(file => PRETTIER_FILE_EXT.includes(extname(file)))
    } else{
        const pattern = join(
            options.include, //进行规范扫描的目录
            `**/*.{${PRETTIER_FILE_EXT.map(ext => ext.replace(/^\./,'')).join(',')}}`
        )
        files = await fg(pattern,{
            cwd:options.cwd,  //在哪里搜索
            ignore:PRETTIER_IGNORE_PATTERN  //忽略的文件
        })
    }
    await Promise.all(files.map(formatFile))
}

export async function formatFile(filePath: string) {
    const text = await readFile(filePath, 'utf8')
    const options = await prettier.resolveConfig(filePath) //返回路径下的prettier配置
    const formatted = prettier.format(text, {
        ...options, //使用resolveConfig返回的配置
        filepath: filePath, //告诉prettier当前文件路径
    })
    await writeFile(filePath, formatted) //fs.writeFileSync 是直接覆盖原有文件！
}