const path = require('path');
const RULE_NAME = 'no-js-in-ts-project';
const  JS_REG = /\.jsx?$/
const DEFAULT_WHITE_LIST = [
    'commitlint.config.js',
    'stylelintrc',
    'prettierrc.js',
    'eslintrc.js'
]
module.exports = {
    name: RULE_NAME,
    meta: {
        type:'suggestion',
        fixable:null,
        messages:{
            noJsInTsProject: 'The "{{fileName}} is not recommended in TS project!"'
        }
    },
    create(context){
        const fileName = context.getFilename();
        const extName = path.extname(fileName);
        const ruleOptions = context.options[0] || {};
        let { whiteList = {}, autoMerge = true } = ruleOptions;
        if(whiteList.length == 0){
            whiteList = DEFAULT_WHITE_LIST;
        }else if(autoMerge){
            whiteList = [...new Set([...whiteList, ...DEFAULT_WHITE_LIST])];
        }
        const whiteListReg = new RegExp(`(${whiteList.join('|')})$`);
        if(!whiteListReg.test(fileName) && JS_REG.test(extName)){          
            context.report({
                los:{
                    start:{
                        line:0,
                        column:0
                    },
                    end:{
                        line:0,
                        column:0
                    },
                },
                messageId: 'noJsInTsProject',
                data:{
                    fileName
                }
            })
        }  

        return {}
    }
}