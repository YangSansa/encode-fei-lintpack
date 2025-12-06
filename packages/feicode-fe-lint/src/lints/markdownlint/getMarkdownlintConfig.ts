import path from 'path';
import glob from 'glob';
import markdownlint from 'markdownlint';
import markdownlintConfig from 'feicode-fe-markdownlint-config';
import type { ScanOptions, PKG, Config } from '../../type';

type LintOptions = markdownlint.Options & { fix?: boolean };

/**
 * 获取markdownlint配置
 */

export function getMarkdownlintConfig(opts: ScanOptions, pkg: PKG, config: Config): LintOptions {
    const { cwd } = opts;
    const lintConfig: LintOptions = {
        fix:Boolean(opts.fix),
        resultVersion: 3, //控制 markdownlint 返回的错误/警告结果的格式和详细程度。3代表最详细，包含修复信息
    }
    if(config.markdownlintOptions){
        Object.assign(lintConfig, config.markdownlintOptions)
    }else{
        const lintConfigFiles = glob.sync('.markdownlint.@(yml|yaml|json)', { cwd });
        if (lintConfigFiles.length == 0) {
            lintConfig.config = markdownlintConfig;           
        } else {
            lintConfig.config = markdownlint.readConfigSync(path.resolve(cwd, lintConfigFiles[0]));
        }
    }
    return lintConfig
}