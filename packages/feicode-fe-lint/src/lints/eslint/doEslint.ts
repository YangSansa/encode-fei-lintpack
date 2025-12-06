import { ESLint } from "eslint";
import fg from "fast-glob";
import { extname } from "path";
import type { Config, PKG, ScanOptions } from "../../type";
import { ESLINT_FILE_EXT, ESLINT_IGNORE_PATTERN } from "../../utils/constants";
import { formatESLintResults } from "./formatESLintResults";
import { getESLintConfig } from "./getESLintConfig";

export interface DoESLintOptions extends ScanOptions {
    pkg: PKG,
    config?: Config,
}

export async function doESLint(options: DoESLintOptions) {
    let files: string[];
    if(options.files){
        files = options.files.filter(file => ESLINT_FILE_EXT.includes(extname(file)));
    }else{
        files = await fg(`**/*.{${ESLINT_FILE_EXT.map(ext => ext.replace(/\./,'')).join(',')}}`,{
            cwd:options.cwd,
            ignore:ESLINT_IGNORE_PATTERN
        })
    }

    const eslint = new ESLint(getESLintConfig(options, options.config, options.pkg)); //生成eslint实例
    const report = await eslint.lintFiles(files); //用于对指定文件进行代码质量检查。输入：文件路径数组 输出：检查结果报告（Promise）
    if(options.fix){
        await ESLint.outputFixes(report); //把 ESLint 检查报告中可自动修复的问题，直接修改到源文件中
    }
    return formatESLintResults(report, options.quiet, eslint);
}