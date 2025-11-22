module.exports = {
    extends:[
        './index.js',
        './rules/vue.js'
    ].map(require.resolve),
    parserOptions: {
        parser:'@babel/eslint-parser'
    }
}