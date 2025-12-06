import { ESLint } from 'eslint';
import type { ScanResult } from '../../type';
/**
 * 格式化eslint输出结果
 */

export function formatESLintResults(results: ESLint.LintResult[], quiet: boolean, eslint: ESLint): ScanResult[] {
    const rulesMeta = eslint.getRulesMetaForResults(results) //获取规则元信息
    return results
        .filter(({warningCount, errorCount}) => warningCount || errorCount)
        .map(
            ({
                filePath,
                messages,
                errorCount,
                warningCount,
                fixableErrorCount,
                fixableWarningCount,
            }) => ({
                filePath,
                errorCount,
                warningCount: quiet ? 0 : warningCount, ////quiet为true时，只保留错误消息，不保留警告消息，所以warningCount为0
                fixableErrorCount,
                fixableWarningCount: quiet ? 0 : fixableWarningCount,
                messages:messages.map(({line = 0, column = 0, ruleId, fatal, message, severity}) =>{
                    return {
                        line,
                        column,
                        rule: ruleId,
                        url: rulesMeta[ruleId]?.docs?.url || '',
                        message: message.replace(/([^ ])\.$/u, '$1'), 
                        //[^ ] 匹配：不是空格的任何字符 /u = "启用 Unicode 模式，让正则表达式能正确处理中文、emoji 等特殊字符" -> 去掉句号
                        errored: fatal || severity === 2, // 2表示错误，1表示警告 fatal表示致命错误
                    };
                }).filter(({errored}) => (quiet ? errored : true))
                //过滤掉quiet为true时，errored为false的,只保留 errored 为 true 的消息
                //如果quiet为false，则不过滤，全部返回
                
            })
        )
}