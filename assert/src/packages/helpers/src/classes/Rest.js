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
        this.headers['X-WP-Nonce']=nonce;
        return this;
    }
}