## lerna.json配置项

version：指定整个项目的当前版本号
packages：定义包含各个包的目录路径。例如，如果项目中所有包都在 packages 目录下，配置如下：
"packages": ["packages/*"]
npmClient：指定使用的 npm 客户端，可选值有 npm、yarn 或 pnpm。默认是 npm
npm客户端：一个命令行工具，也就是我们通常直接在终端或命令行中运行的 npm 命令。
command：用于配置 Lerna 不同命令的行为。比如 publish 命令的配置：

## package.json配置项
workspace：在 根目录 的 package.json 中配置 workspaces 字段。它是一个字符串数组，用于指定包含子包的目录路径
publishConfig:仅在发布时覆盖 package.json 的某些配置。这些覆盖仅在将包发布到 npm 注册表时才生效。 它在本地开发时会被忽略。
选项：
"access"：指定包的访问级别，可选值有 public 和 private。默认是 private
"registry"：指定一个自定义的或公司内部的 npm 镜像源（Registry）来发布包，而不是默认的 https://registry.npmjs.org/。
"tag"：指定发布包时使用的标签，默认是 latest。通常会使用其他标签（如 "beta", "next"），这样用户需要明确指定标签才能安装，
其它字段
"bin": 发布时修改命令行工具的路径。
"main": 发布时修改入口文件。
"types": 发布时修改 TypeScript 类型定义文件路径。

## "preinstall": "npx only-allow pnpm" 是什么意思？
当任何人在这个项目中运行 npm install 或 yarn install 时，preinstall 脚本会首先被触发。它会执行 npx only-allow pnpm。
npx: 一个用来执行 npm 包二进制命令的工具，它会自动从本地或远程获取并运行指定的包，而无需先全局安装。
only-allow: 一个专门设计用来强制项目使用特定包管理器的 npm 包。
pnpm: 传递给 only-allow 的参数，指定要强制使用的包管理器。

