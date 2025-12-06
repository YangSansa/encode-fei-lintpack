import { LintResult } from "stylelint";
import type { ScanResult } from "../../type";
import { getStylelintDocUrl } from "./getStylelintDocUrl";

/**
 * 格式化stylelint的输出结果
 */
export function formatStylelintResults(results: LintResult[], quiet: boolean): ScanResult[] {
    return results.map(({ source, warnings }) => {
        let errorCount = 0
        let warningCount = 0
        const messages = warnings
            .filter(item => !quiet || item.severity === "error")
            .map(item => {
                const { line = 0, column = 0, severity, text, rule } = item
                if(severity === 'error'){
                    errorCount++
                }else{
                    warningCount++
                }
                return {
                    line,
                    column,
                    rule,
                    url: getStylelintDocUrl(rule),
                    message: text.replace(/([^ ])\.$/u, "$1").replace(new RegExp(`\\(${rule}\\)`), ''),
                    // // 第一步：移除末尾的句点（如果前面不是空格）// 第二步：移除规则名称（带括号的）
                    errored: severity === "error",
                }
            })
        return {
            filePath:source,
            messages,
            errorCount,
            warningCount,
            fixableErrorCount:0,
            fixableWarningCount:0
        }
    })
}