
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
        this.nonce=nonce;
        return this;
    }
}