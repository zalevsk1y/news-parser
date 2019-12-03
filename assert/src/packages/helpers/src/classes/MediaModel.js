
import {Ajax} from './Ajax'

export class MediaModel extends Ajax{
  
    constructor(endPoint){
        super(endPoint);
    }
    create(url,alt,postId){
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