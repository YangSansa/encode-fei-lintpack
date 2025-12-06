import npmType from '../utils/npm-type';
import { execSync } from 'child_process';
import ora from 'ora';
import { PKG_NAME, PKG_VERSION } from '../utils/constants';
import log from '../utils/log';

const checkVersionUpdate = async ():Promise<string | null> => {
    const npm = await npmType
    const latestVersion = execSync(`${npm} view ${PKG_NAME} version`).toString('utf-8').trim() //比较保险
    if(latestVersion === PKG_VERSION) return null
    const pkgArr = PKG_VERSION.split('.').map(Number)
    const latestArr = latestVersion.split('.').map(Number)
    for(let i = 0; i < pkgArr.length; i++) {
        if(pkgArr[i] > latestArr[i]){
            return null
        }else if(pkgArr[i] < latestArr[i]){
            return latestVersion
        }
    }
}

/** 
 * 检查包的版本-检查的是：CLI 工具自身的更新而不是用户package.dependecies里的依赖更新
 * 然后自动安装install
 */

export default async (install = true) => {
    const checking = ora(`[${PKG_NAME}]: 正在检查最新版本...`)
    checking.start()
    try {
        const npm = await npmType
        const latestVersion = await checkVersionUpdate()
        checking.stop()

        if(latestVersion && install){
            const update = ora(`[${PKG_NAME}]: 存在最新版本, 将升级至${latestVersion}`)
            update.start()
            execSync(`${npm} i -g ${PKG_NAME}`)
            update.stop()
        }else if(latestVersion){
            log.warn(
                `最新版本为${latestVersion}, 本地版本为${PKG_VERSION},请尽快升级到最新版本。\n你可以执行 ${npm} install -g ${PKG_NAME}@latest 来安装此版本\n`
            )
        }else if(install){
            log.warn(
                `当前没有可用的更新`
            )
        }
    }catch(e){
        checking.stop()
        log.error(e)
    }
}