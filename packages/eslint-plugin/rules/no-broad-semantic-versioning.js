const path = require('path');
const noBroadSemanticVersioning = require('../../../../02-fe-spec/packages/eslint-plugin/rules/no-broad-semantic-versioning');
const RULE_NAME = 'no-broad-semantic-versioning';
module.exports = {
    name: RULE_NAME,
    meta:{
        type: 'problem',
        fixable:null,
        messages:{
            noBroadSemanticVersioning: 'the "{{ dependencyName }} is not recommanded to use {{versioning}}"'
        }
    },
    create(context){
        if(path.basename(context.getFilename()) !== 'package.json'){
            return {}
        }
        const cwd = context.getCwd();
        return {
            property(node){
                if(node.key && node.key.value && 
                    (node.key.value === 'dependencies' || node.key.value === 'devDependencies') &&
                    node.value && node.value.properties
                ){
                    node.value.properties.forEach(property=>{
                        if(property.key && property.key.value){
                            const dependencyName = property.key.value
                            const dependencyVersion = property.value.value
                            if(
                                dependencyVersion.indexOf('*') > -1 ||
                                dependencyVersion.indexOf('x') > -1 ||
                                dependencyVersion.indexOf('>') > -1
                            ){
                                context.report({
                                    loc: property.loc,
                                    messageId: noBroadSemanticVersioning,
                                    data:{
                                        dependencyName,
                                        versioning: dependencyVersion
                                    }
                                })
                            }
                        }
                    })
                
                
                }
            }
        }
    }
}