
const RULE_NAME = 'no-secret-info';

const DEFAULT_DANGEROUS_KEYS = ['secret', 'token', 'password']

module.exports = {
    name: RULE_NAME,
    meta: {
        type:'problem',
        fixable: null,
        messages:{
            noSecretInfo: 'Detect that the "{{secret}}" might be a secret token, please check it.'
        }
    },
    create(context) {
        const ruleOptions = context.options[0] || {};
        let { dangerousKey = [], autoMerge = true } = ruleOptions;
        if(dangerousKey.length == 0){
            dangerousKey = DEFAULT_DANGEROUS_KEYS;
        }else if(autoMerge){
            dangerousKey = [...new Set([...dangerousKey, ...DEFAULT_DANGEROUS_KEYS])]
        }
        const reg = new RegExp(dangerousKey.join('|'));
        return {
            Literal(node){
                if(node.value &&
                   node.parent &&
                   (
                     node.parent.type == 'Property' &&
                     node.parent.id &&
                     node.parent.id.name &&
                     reg.test(node.parent.id.name.toLowerCase())) ||
                     (node.parent.type == 'Property' &&
                       node.parent.key &&
                       node.parent.key.name &&
                       reg.test(node.parent.key.name.toLowerCase()))
                ){
                    context.report({
                        node,
                        messageId:'noSecretInfo',
                        data:{
                            secret: node.value
                        }
                    })
                } 
                
            }
        }
    }
}