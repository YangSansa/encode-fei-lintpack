import { sync as commandExistsSync } from 'command-exists';

/** 
 * command-exists 是一个 Node.js 包，用于检查系统命令是否在 PATH 环境变量中存在且可执行。比如git是否安装
 * npm类型
 */
const promise: Promise<'pnpm' | 'npm'> = new Promise((resolve)=>{
    if(!commandExistsSync('pnpm')) resolve('npm')
        resolve('pnpm')
})
export default promise