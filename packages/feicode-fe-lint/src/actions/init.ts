import path from 'path';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import spawn from 'cross-spawn';
import update from './update';
import npmType from '../utils/npm-type';
import log from '../utils/log';
import conflictResolve from '../utils/conflict-resolve';
import generateTemplate from '../utils/generate-template';
import { PROJECT_TYPES, PKG_NAME } from '../utils/constants';
import type { InitOptions, PKG } from '../type';

let step = 0;

/**
 * 选择项目语言和框架
 */

const chooseEslintType = async (): Promise<string> => {
  const { type } = await inquirer.prompt({
    type: 'list', // 交互类型
    name: 'type', // 交互名称-键名
    message: `Step ${++step}. 请选择项目的语言(JS/TS)和框架(React/Vue)类型: `,
    choices: PROJECT_TYPES,
  });
  return type;
};

/**
 * 选择是否启用stylelint
 * @param defaultValue 默认值
 */
const chooseEnableStylelint = async (defaultValue: boolean): Promise<boolean> => {
  const { enable } = await inquirer.prompt({
    type: 'confirm', // 交互类型
    name: 'enable', // 交互名称-键名
    message: `Step ${++step}. 是否需要使用stylelint(若没有样式文件则不需要): `,
    default: defaultValue, // 默认值
  });
  return enable;
};

/**
 * 是否启用markdownlint
 */

const chooseEnableMarkdownlint = async (): Promise<boolean> => {
  const { enable } = await inquirer.prompt({
    type: 'confirm', // 交互类型
    name: 'enable', // 交互名称-键名
    message: `Step ${++step}. 是否需要使用markdownlint(若没有markdown文件则不需要): `,
    default: true, // 默认值
  });
  return enable;
};

/**
 * 是否启用prettier
 */
const chooseEnablePrettier = async (): Promise<boolean> => {
  const { enable } = await inquirer.prompt({
    type: 'confirm', // 交互类型
    name: 'enable', // 交互名称-键名
    message: `Step ${++step}. 是否需要使用prettier文件格式化代码: `,
    default: true, // 默认值
  });
  return enable;
};

export default async (options: InitOptions) => {
  const cwd = options.cwd || process.cwd();
  const isTest = process.env.NODE_ENV === 'test';
  const checkVersionUpdate = options.checkVersionUpdate || false;
  const disableNpmInstall = options.disableNpmInstall || false;
  const config: Record<string, any> = {};
  const pkgPath = path.resolve(cwd, 'package.json');
  let pkg: PKG = fs.readJSONSync(pkgPath);

  //版本检查-测试环境不需要版本检查，避免网络请求干扰测试
  if (checkVersionUpdate && !isTest) {
    await update(false);
  }

  //初始化enableEslint，默认为true，无需让 用户选择
  if (typeof options.enableESLint == 'boolean') {
    config.enableESLint = options.enableESLint;
  } else {
    config.enableESLint = true;
  }

  //初始化eslintType-resct/vue/js/ts/node
  if (options.eslintType && PROJECT_TYPES.find((choice) => choice.value === options.eslintType)) {
    config.eslintType = options.eslintType;
  } else {
    config.eslintType = await chooseEslintType();
  }

  //初始化enableStleLint
  if (typeof options.enableStylelint == 'boolean') {
    config.enableStylelint = options.enableStylelint;
  } else {
    //如果是node项目，结果取反
    config.enableStylelint = await chooseEnableStylelint(!/node/.test(config.eslintType));
  }

  //初始化enableMarkdownlint
  if (typeof options.enableMarkdownlint == 'boolean') {
    config.enableMarkdownlint = options.enableMarkdownlint;
  } else {
    config.enableMarkdownlint = await chooseEnableMarkdownlint();
  }

  //初始化enablePrettier
  if (typeof options.enablePrettier == 'boolean') {
    config.enablePrettier = options.enablePrettier;
  } else {
    config.enablePrettier = await chooseEnablePrettier();
  }

  if (!isTest) {
    log.info(`Step ${++step}. 检查并处理项目中可能存在的依赖和配置冲突`);
    pkg = await conflictResolve(cwd, options.rewriteConfig);
    log.success(`Step ${step}. 已完成项目依赖和配置冲突检查处理`);

    //如果没有禁用 npm 自动安装，就执行安装操作
    if (!disableNpmInstall) {
      log.info(`Step ${++step}. 正在安装依赖...`);
      const npm = await npmType;
      spawn.sync(npm, ['i', '-D', PKG_NAME], { stdio: 'inherit' });
      log.success(`Step ${step}. 依赖安装完成`);
    }
  }

  //更新pkg.json
  pkg = fs.readJSONSync(pkgPath);
  if (!pkg.script) {
    pkg.script = {};
  }
  if (!pkg.scripts[`${PKG_NAME}-scan`]) {
    pkg.scripts[`${PKG_NAME}-scan`] = `${PKG_NAME} scan`;
  }
  if (!pkg.scripts[`${PKG_NAME}-fix`]) {
    pkg.scripts[`${PKG_NAME}-fix`] = `${PKG_NAME} fix`;
  }

  //配置commit卡点
  log.info(`Step ${++step}. 配置 commit 卡点...`);
  if (!pkg.husky) {
    pkg.husky = {};
  }
  if (!pkg.husky.hooks) {
    pkg.husky.hooks = {};
  }
  pkg.husky.hooks['pre-commit'] = `${PKG_NAME} commit-file-scan`;
  pkg.husky.hooks['commit-msg'] = `${PKG_NAME} commit-msg-scan`;
  fs.writeJSONSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf-8');
  log.success(`Step ${step}. commit 卡点配置完成`);

  log.info(`Step ${++step}. 写入配置文件`);
  generateTemplate(cwd, config);
  log.success(`Step ${step}. 配置文件写入完成`);

  //完成信息
  const logs = `${PKG_NAME} 初始化完成`;
  log.success(logs);
};
