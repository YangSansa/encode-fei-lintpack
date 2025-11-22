const assert = require('assert')
const stylelint = require('stylelint')
const path = require('path')

describe('rules.validate.test.js', () => {
    it('validate default', async ()=>{
        const filePaths = [path.join(__dirname, './fixtures/index.css')]
        const result = await stylelint.lint({
            configFile: path.join(__dirname, '../index.js'),
            files: filePaths,
            fix:true
        })
        if(result?.errored){
            const filesResult = JSON.parse(JSON.parse(JSON.stringify(result.output)) || '[]') || []
            filesResult.forEach(fileResult => {
                console.log(`================${filePaths}==============`)
                console.log('fileResult',fileResult.warnings)
            })
            assert.ok(filesResult.length !== 0)
        }
    }),
    it('validate scss', async ()=>{
        const filePaths = [path.join(__dirname, './fixtures/scss-test.scss')]
        const result = await stylelint.lint({
            configFile: path.join(__dirname, '../index.js'),
            files: filePaths,
            fix:true
        })
        if(result?.errored){
            const filesResult = JSON.parse(JSON.parse(JSON.stringify(result.output)) || '[]') || []
            filesResult.forEach(fileResult => {
                console.log(`================${filePaths}==============`)
                console.log('fileResult-scss',fileResult.warnings)
            })
            assert.ok(filesResult.length !== 0)
        }
    })
 })