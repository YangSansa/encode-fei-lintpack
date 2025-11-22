/*
 * @Author: yangif 19803006837@163.com
 * @Date: 2025-11-18 22:36:22
 * @LastEditors: yangif 19803006837@163.com
 * @LastEditTime: 2025-11-18 22:37:20
 * @FilePath: \前端编码规范工程化\01-fei-spec\packages\eslint\rules\es5.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * 本文件用于覆盖掉个别 ES5 与 ES6 不同的规则
 */

module.exports = {
  rules: {
    // 逗号风格 - ES5 中不加最后一个逗号
    // @unessential
    'comma-dangle': ['error', 'never'],
  },
};