import {Ajax} from './Ajax'
/**
 * Download and save image to wordpress media library. 
 * 
 * @since 1.0.0
 */
export class MediaModel extends Ajax{
  
    constructor(endPoint){
        super(endPoint);
    }
    /**
     * Send request to server. 
     * 
     * @param {string} url 
     * @param {string} alt 
     * @param {number} postId 
     * @returns {Promise}
     */
    create(url,alt,postId){
        let argsError=this.argsCheck({url,alt,postId});
        if(argsError instanceof Error) throw argsError;
        let ajaxUrl=this.endPoint,
            body={url,
                options:{
                    alt,
                    postId
                }
            };
        if(this.nonce)ajaxUrl+='&_wpnonce='+this.nonce;

        return fetch(ajaxUrl,{
            method:'POST',
            headers:this.headers,
            body:JSON.stringify(body)
        })
        .then(response=>response.json())
        .then(receive=>{
            return receive;
        })
    }
}