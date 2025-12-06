import execa from 'execa'; //用于执行命令行命令

/**
 * 获取此次 commit 修改的文件列表：获取 Git 暂存区中已修改的文件列表
 * @param options
 */

export const getCommitFiles = async (options: execa.Options = {}): Promise<string[]> => {
    try{
        
        const { stdout } = await execa(
            'git',
            [
                'diff',
                '--staged', //比较暂存区和last commit之间的区别
                '--diff-filter-ACMR', //只显示新增、修改、删除、重命名，即added、modified、copied、renamed
                '--name-only', //只显示更改文件的名称
                '--ignore-submodules', //忽略子模块的改动，什么是子模块？子模块就是git仓库中的另一个git仓库
            ],
            {
                ...options,
                all:true, //显示所有分支的提交
                cwd: options.cwd || process.cwd(), //指定工作目录
            }
        )

        return stdout ? stdout.split(/\s/).filter((Boolean)) : [] //将stdout按空格分割，并过滤掉空字符串
    }catch(e){
        return []
    }
}

/**
 * 获取此次未 add 的修改文件列表
 * @param options
 */

export const getAmendFiles = async( options: execa.Options = {}): Promise<string> => {
    try{
        const { stdout } = await execa(
            'git',
            [
                'diff', //不指定--staged比较的是工作目录与暂存区之间的差异，显示已修改但未暂存 (git add) 的改动
                '--name-only', //只显示更改文件的名称
            ],
            {
                ...options,
                all:true, //显示所有分支的提交
                cwd: options.cwd || process.cwd(), //指定工作目录
            }
        )

        return stdout
    }catch(e){
        return ''
    }
}