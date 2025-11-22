const assert = require('assert');
const eslint = require('eslint');
const path = require('path');

describe('test/use-babel-eslint.test.js', () => {
    it('babel-eslint parser run well for js', async () =>{
        const configPath = './index.js'
        const filePath = path.join(__dirname, './fixtures/es5.js')
        const cli = new eslint.ESLint({
            overrideConfigFile:configPath,
            useEslintrc: false,
            ignore:false
        })
        const results = await cli.lintFiles([filePath])
        const { messages, errorCount, fatalErrorCount, warningCount} = results[0]

        assert.equal(errorCount, 27)
        assert.equal(fatalErrorCount, 0)
        assert.equal(warningCount, 7)
        console.log('messages', messages)
        const errorReportedByReactPlugin = messages.filter(result =>{
            
        })
    })
})