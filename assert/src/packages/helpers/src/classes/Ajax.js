/**
 * Base Ajax class.
 * 
 * @since 1.0.0
 */
export class Ajax{
    constructor(endPoint){
        if(!endPoint)throw new Error('No ajaxApiRoot was set.');
        this.endPoint=endPoint;
        this.headers={
            'Content-Type': 'application/json',
            'accept': 'application/json',
        }
    }
    nonceAuth(nonce){
        let argsError=this.argsCheck({nonce});
        if(argsError instanceof Error) throw argsError;
        this.nonce=nonce;
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