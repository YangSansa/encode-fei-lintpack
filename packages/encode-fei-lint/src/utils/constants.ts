import path from 'path';
import fs from 'fs-extra';

//Record是TypeScript 中的内置工具类型，用于构造对象类型。
/**
 * Record<KeyType, ValueType>
 *  KeyType：表示对象键的类型
 *  ValueType：表示对象值的类型
 */
const pkg: Record<string, any> = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf-8'),
);

export const PKG_NAME = pkg.name;
export const PKG_VERSION = pkg.version;
export enum UNICODE {
  success = '\u2714',
  failure = '\u2716',
}

/**
 * 可供选择的项目类型
 */
export const PROJECT_TYPES: Array<{ name: string; value: string }> = [
  {
    name: '未使用 React、Vue、Node.js 的项目（JavaScript）',
    value: 'index',
  },
  {
    name: '未使用 React、Vue、Node.js 的项目（TypeScript）',
    value: 'typescript',
  },
  {
    name: 'React 项目（JavaScript）',
    value: 'react',
  },
  {
    name: 'React 项目（TypeScript）',
    value: 'typescript/react',
  },
  {
    name: 'Rax 项目（JavaScript）',
    value: 'rax',
  },
  {
    name: 'Rax 项目（TypeScript）',
    value: 'typescript/rax',
  },
  {
    name: 'Vue 项目（JavaScript）',
    value: 'vue',
  },
  {
    name: 'Vue 项目（TypeScript）',
    value: 'typescript/vue',
  },
  {
    name: 'Node.js 项目（JavaScript）',
    value: 'node',
  },
  {
    name: 'Node.js 项目（TypeScript）',
    value: 'typescript/node',
  },
  {
    name: '使用 ES5 及之前版本 JavaScript 的老项目',
    value: 'es5',
  },
];

//eslint扫描文件扩展名
export const ESLINT_FILE_EXT: string[] = ['.js', '.jsx', '.ts', '.tsx', '.vue'];

/**
 * eslint扫描忽略的文件或文件目录
 * 需要同步到config/.eslintignore.ejs
 */

export const ESLINT_IGNORE_PATTERN: string[] = [
  'node_modules',
  'build',
  'dist',
  'coverage',
  'es',
  'lib',
  '**/*.min.js',
  '**/*-min.js',
  '**/*.bundle.js',
]

//stylelint扫描文件扩展名
export const STYLELINT_FILE_EXT: string[] = ['.css', '.less', '.scss', '.sass'];

/**
 * stylelint扫描忽略的文件或文件目录
 */
export const STYLELINT_IGNORE_PATTERN: string[] = [
  'node_modules',
  'build',
  'dist',
  'coverage',
  'es',
  'lib',
  '**/*.min.js',
  '**/*-min.js',
  '**/*.bundle.js'
];

//markdownlint扫描文件扩展名
export const MARKDOWNLINT_FILE_EXT: string[] = ['.md'];

/**
 * markdownlint扫描忽略的文件或文件目录
 */
export const MARKDOWNLINT_IGNORE_PATTERN: string[] = [
  'node_modules/',
  'build/',
  'dist/',
  'coverage/',
  'es/',
  'lib/',
]

/**
 * prettier扫描文件扩展名
 */

export const PRETTIER_FILE_EXT: string[] = [
  ...ESLINT_FILE_EXT,
  ...STYLELINT_FILE_EXT,
  ...MARKDOWNLINT_FILE_EXT,
]

/**
 * prettier扫描忽略的文件或文件目录
 */
export const PRETTIER_IGNORE_PATTERN: string[] = [
  'node_modules/**/*',
  'build/**/*',
  'dist/**/*',
  'lib/**/*',
  'es/**/*',
  'coverage/**/*',
]