import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
    bundler: viteBundler(), // 使用vite打包
    lang: 'zh-CN',
    title: '我的技术博客',
    description: '记录学习与成长',  
    base:'/fei-spec/',  
    theme: defaultTheme({
        navbar: [
            { text: '首页', link: '/index.md' },
            { 
              text: '编码规范', 
              children:[
                { text: 'HTML 编码规范', link: '/coding/html.md' },
                { text: 'CSS 编码规范', link: '/coding/css.md' },
                { text: 'JavaScript 编码规范', link: '/coding/javascript.md' },
                { text: 'Typescript 编码规范', link: '/coding/typescript.md' },
                { text: 'Node 编码规范', link: '/coding/node.md' },               
              ] 
            },
            {
                text: '工程规范',
                children: [
                    { text: 'Git 规范', link: '/engineering/git.md' },
                    { text: '文档规范', link: '/engineering/doc.md' },
                    { text: 'CHANGELOG 规范', link: '/engineering/changelog.md' },
                ],
            },
            {
                text: 'NPM包',
                children: [
                    { text: 'feicode-fei-eslint-config', link: '/npm/eslint.md' },
                    { text: 'feicode-fei-stylelint-config', link: '/npm/stylelint.md' },
                    { text: 'feicode-fei-commitlint-config', link: '/npm/commitlint.md' },
                    { text: 'feicode-fei-markdownlint-config', link: '/npm/markdownlint.md' },
                    { text: 'feicode-fei-eslint-plugin', link: '/npm/eslint-plugin.md' },
                ],
            },
            {
                text: '脚手架',
                children: [
                    { text: 'feicode-fei-lint', link: '/cli/feicode-fei-lint.md' }
                ],
            },
        ],
        sidebar:[
            {
                text: '编码规范',
                children: [
                {
                    text: 'HTML 编码规范',
                    link: '/coding/html.md',
                },
                {
                    text: 'CSS 编码规范',
                    link: '/coding/css.md',
                },
                {
                    text: 'JavaScript 编码规范',
                    link: '/coding/javascript.md',
                },
                {
                    text: 'Typescript 编码规范',
                    link: '/coding/typescript.md',
                },
                {
                    text: 'Node 编码规范',
                    link: '/coding/node.md',
                },
                ],
            },
            {
                text: '工程规范',
                children: [
                {
                    text: 'Git 规范',
                    link: '/engineering/git.md',
                },
                {
                    text: '文档规范',
                    link: '/engineering/doc.md',
                },
                {
                    text: 'CHANGELOG 规范',
                    link: '/engineering/changelog.md',
                },
                ],
            },
            {
                text: 'NPM包',
                children: [
                { text: 'feicode-fei-eslint-config', link: '/npm/eslint.md' },
                { text: 'feicode-fei-stylelint-config', link: '/npm/stylelint.md' },
                { text: 'feicode-fei-commitlint-config', link: '/npm/commitlint.md' },
                { text: 'feicode-fei-markdownlint-config', link: '/npm/markdownlint.md' },
                { text: 'feicode-fei-eslint-plugin', link: '/npm/eslint-plugin.md' },
                ],
            },
            {
                text: '脚手架',
                children: [{ text: 'feicode-fei-lin', link: '/cli/feicode-fei-lint.md' }],
            },
        ],
        //sidebar: 'auto', // 自动生成侧边栏
        logo: '/images/logo.jpg',
    }),
    plugins:[]
})