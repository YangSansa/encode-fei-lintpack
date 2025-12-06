# `encode-fei-lint`

## 交互：用command和chalk插件

execSync 基本介绍
import { execSync } from 'child_process';
execSync 是 Node.js child_process 模块提供的方法，用于同步执行系统命令。
execSync(`${npm} view ${PKG_NAME} version`)

execSync 返回一个 Buffer 对象，其中包含了命令的输出内容。你可以使用 toString() 方法将其转换为字符串。

execSync 方法会阻塞当前线程，直到命令执行完成。如果命令执行失败，它会抛出一个错误。

chalk 是一个用于在终端中输出彩色文本的库。你可以使用它来在终端中输出不同颜色的文本，以便更好地区分不同的信息。

## package.JSON

"main": "./lib/index.js",
"bin": "./lib/cli.js",
"files": ["lib/"],

main 字段指定了包的入口文件，即当其他模块使用 require() 引用这个包时，会加载这个文件。
bin 字段指定了包的可执行文件，即当用户在命令行中运行这个包时，会执行这个文件。
files 字段指定了包中包含的文件和目录，即当用户安装这个包时，只有这些文件和目录会被包含在 node_modules 目录中。告诉 npm 只打包发布哪些文件

常见模式：
编译后的代码放在 lib/ 或 dist/ 文件夹
源码放在 src/ 文件夹
只发布编译后的 lib/，不发布源码 src/

## type IInitOptions = Omit<InitOptions, 'checkVersionUpdate'>

Omit<InitOptions, 'checkVersionUpdate'> 是 TypeScript 提供的一个泛型工具类型，用于从类型 InitOptions 中排除属性 'checkVersionUpdate'。
若后续 InitOptions 新增 / 修改属性，IInitOptions 会自动同步（除了被剔除的 checkVersionUpdate）
如果需要剔除多个属性，第二个参数用联合类型（| 分隔）：type IInitOptions = Omit<InitOptions, 'checkVersionUpdate' | 'timeout'>;

## fast-glob 是一个超快的文件匹配库，用来快速查找文件和文件夹

    "feicode-fe-commitlint-config": "^1.0.0",
    "feicode-fe-eslint-config": "^1.0.0",
    "feicode-fe-markdownlint-config": "^1.0.0",
    "feicode-fe-stylelint-config": "^1.0.0",