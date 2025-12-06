import markdownlint from "markdownlint";
import type { ScanResult } from "@/type";

/**
 * 格式化markdown的输出结果
 */

export function formatMarkdownlintResults(results: markdownlint.LintResults, quiet:boolean):ScanResult[] {
    const parsedResults = []
    for(const file in results){
        if(!Object.prototype.hasOwnProperty.call(results, file) || quiet) continue; //跳过自身没有的属性，或者quiet为true
        let warningCount = 0
        let fixableWarningCount = 0
        const messages = results[file].map(
            ({ lineNumber, ruleNames, ruleDescription,ruleInformation, errorRange, fixInfo }) =>{
                if(fixInfo){
                    fixableWarningCount++
                }
                warningCount++ // 这里是统计所有警告，包括可修复的
                return {
                    line: lineNumber,
                    column: Array.isArray(errorRange) ? errorRange[0] : 1,
                    rule: ruleNames[0],
                    url: ruleInformation,
                    message: ruleDescription,
                    errored: false
                }
            }
        )
        parsedResults.push({
            filePath: file,
            messages,
            errorCount:0,
            warningCount,
            fixableWarningCount,
            fixableErrorCount: 0
        })
    }
    return parsedResults
}