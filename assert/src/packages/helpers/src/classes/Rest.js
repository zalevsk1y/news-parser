/**
 * Base Rest class
 * 
 * @since 1.0.0
 */
export class Rest{
    constructor(restApiRoot){
        if(!restApiRoot)throw new Error('No restApiRoot was set.');
        this.rootApi=restApiRoot;
        this.headers={
            'Content-Type': 'application/json',
            'accept': 'application/json',
        }   
    }
    nonceAuth(nonce){
        let argsError=this.argsCheck({nonce});
        if(argsError instanceof Error) throw argsError;
        this.headers['X-WP-Nonce']=nonce;
        return this;
    }
    argsCheck(args){
        let argNames=Object.keys(args);
        argNames.forEach(name=>{
            if (args[name]===undefined) return new Error ('Argument ${name} is undefined.')
        })
        return true;
    }
}