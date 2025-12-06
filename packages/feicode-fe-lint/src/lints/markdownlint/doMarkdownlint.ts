import fg from 'fast-glob';
import { readFile, writeFile } from 'fs-extra';
import markdownlint, { LintError } from 'markdownlint';
import { markdownlintRuleHelpers } from 'markdownlint-rule-helpers';
import { extname, join } from 'path';
import { ScanOptions, PKG, Config } from '@/type';
import { MARKDOWNLINT_FILE_EXT, MARKDOWNLINT_IGNORE_PATTERN } from '@/utils/constants';
import { getMarkdownlintConfig } from './getMarkdownlintConfig'
import { formatMarkdownlintResults } from './formatMarkdownlintResults';
import { get } from 'lodash';

export interface DoMarkdownlintOptions extends ScanOptions {
    pkg: PKG;
    config: Config;
}

export async function doMarkdownlint(options: DoMarkdownlintOptions) {
    let files: string[];
    if(options.files){
        files = options.files.filter(file => MARKDOWNLINT_FILE_EXT.includes(extname(file)))
    }else{
        const pattern = join(
            options.include,
            `**/*.{${MARKDOWNLINT_FILE_EXT.map(ext => ext.replace(/^\./,'')).join(',')}}`
        )
        files = await fg(pattern,{
            cwd: options.cwd,
            ignore: MARKDOWNLINT_IGNORE_PATTERN,
        })
    }
    const results = await markdownlint.promises.markdownlint({
        ...getMarkdownlintConfig(options, options.pkg, options.config),
        files
    })
    //修复
    if(options.fix){
        await Promise.all(
            Object.keys(results).map(filename => formatMarkdownFile(filename, results[filename])) ////没有返回值但是已经通过函数更改了文件
        )
        /* for(const file in results){ //这段循环没有实际意义
            if(!Object.prototype.hasOwnProperty.call(results, file)) continue; 
        } */
    }
    return formatMarkdownlintResults(results, options.quiet)
    
}

async function formatMarkdownFile(filename: string, errors: LintError[]) {
    const fixes = errors?.filter(error => error.fixInfo) 
    if(fixes?.length > 0){
        const originalText = await readFile(filename, 'utf-8')
        const fixedText = markdownlintRuleHelpers.applyFixes(originalText, fixes) //应用自动修复，输出修复后的文本
        if(originalText !== fixedText){
            await writeFile(filename, fixedText, 'utf-8')
            return errors.filter(error => !error.fixInfo)
        }
    }
    return errors
    
}
