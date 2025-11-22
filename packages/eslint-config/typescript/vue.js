module.exports = {
    extends:[
        '../vue.js',
        '../rules/typescript.js'
    ].map(require.resolve),
    parserOptions: {
        parser: '@typescript-eslint/parser',
    }
}