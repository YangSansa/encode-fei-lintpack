const RULE_NAME = 'no-http-url';

module.exports = {
    name: RULE_NAME,
    meta:{
        type:"suggestion",
        fixable: null,
        messages:{
            noHttpUrl:"Recommanded {{url}} switch to https"
        }
    }, 
    create(context){
        return {
            Literal(node){
                if(node.value && typeof node.value === 'string' && node.value.indexOf('http:') === 0){
                    context.report({
                        node,
                        messageId:'noHttpUrl',
                        data:{
                            url: node.value
                        }
                    })
                }
            }
        }
    }
}