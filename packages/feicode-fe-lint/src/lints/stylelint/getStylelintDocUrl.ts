/**
 * 获取stylelint规则文档地址
 */

export function getStylelintDocUrl(rule: string): string {
    //stylelint-scss
    //stylelint-scss 是第三方插件，规则文档在 GitHub 仓库中, 官方 Stylelint 不包含 SCSS 特定规则的文档
    const match = rule.match(/^@scss\/(\S+)$/);
    if(match){
        //match[1] 是 JavaScript 正则匹配结果中第一个圆括号捕获的内容，在解析和提取字符串中的特定部分时非常有用
        return `https://github.com/kristerkari/stylelint-scss/tree/master/src/rules/${match[1]}`
    }

    //CssSyntaxError 是 CSS 解析器在遇到语法错误时抛出的错误类型。
    if(rule !== 'CssSyntaxError'){
        return `https://stylelint.io/user-guide/rules/list/${rule}`  //stylelint.io 是 Stylelint 的官方网站，是 CSS/SCSS/Less 等样式代码的质量检查工具。
    }

    return ''
    //CssSyntaxError 是 CSS 解析器在遇到语法错误时抛出的错误类型。不是真正的规则：而是解析错误
}