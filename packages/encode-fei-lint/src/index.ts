import ora from 'ora'
import initAction from  './actions/init'
import scanAction from './actions/scan'
import { PKG_NAME } from './utils/constants'
import printReport from './utils/print-report'
import type { InitOptions, ScanOptions } from './type'

//Omit 是 TypeScript 中的工具类型，用于从类型中排除某些属性。
//在这里，我们使用 Omit 来创建一个类型，该类型包含 InitOptions 类型中的所有属性，除了 checkVersionUpdate 属性。
/**
 * 先删除checkVersionUpdate属性,再在调用方法时加回来有以下几种可能
 * 禁止用户控制版本检查行为 
 * 内部固定 checkVersionUpdate: false 
 * 确保一致性：每次调用都有相同行为  
 * 简化接口：用户不需要关心版本检查选项
 */
type IInitOptions = Omit<InitOptions, 'checkVersionUpdate'>

export const  init = async(options: IInitOptions) => {
    return await initAction({
        ...options,
        checkVersionUpdate:false
    })
}


export const scan = async(options: ScanOptions) => {
    const checking = ora()
    checking.start(`执行 ${PKG_NAME} 代码检查`)

    const report = await scanAction(options)
    const { results, errorCount, warningCount } = report
    let type = "success"
    if(errorCount > 0) {
        type = "fail"
    } else if(warningCount > 0) {
        type = "warn"
    }
    checking[type]()

    if(results.length > 0) {
        printReport(results, false)
    }

    return report
}