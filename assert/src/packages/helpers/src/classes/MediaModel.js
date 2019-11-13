import {document} from 'globals';
import {getApiEndpoint} from '../index'

export class MediaModel{
  
    constructor(rootApi){
        if(!rootApi)throw new Error('No rootApi was set.')
     
        this.endPoint=getApiEndpoint('media');
        this.headers={
            'Content-Type': 'application/json',
            'accept': 'application/json',
        }
    }
    nonceAuth(nonce){
        this.nonce=nonce;
        return this;
    }
    create(url,alt,postId){
        console.log(this);
        let restUrl=this.endPoint,
            body={url,
                options:{
                    alt,
                    postId
                }
            };
        if(this.nonce)restUrl+='&_wpnonce='+this.nonce;

        return fetch(restUrl,{
            method:'POST',
            headers:this.headers,
            body:JSON.stringify(body)
        })
        .then(response=>response.json())
        .then(receive=>{
            return receive;
        })
       

    }
    downloadImage(url){
        let image=new Image();
        image.crossOrigin='anonymous';
        image.src=url;
        return image;
    }
    createFile(url){
        let type=this.checkFileType(url),
            pattern=new RegExp('([^\/]*\.'+type+')','g'),
            fileName=url.match(pattern)[0],
            metadata={
                type:'image/'+type
            },
            canvas=document.createElement('canvas'),
            context=canvas.getContext('2d'),
            image=this.downloadImage(url);
            return new Promise(resolve=>{
                image.onload=function(){
                    canvas.width=image.width,
                    canvas.height=image.height;
                    context.drawImage(image, 0, 0, image.width, image.height);
                    let buffer=context.getImageData(0,0, image.width, image.height).data.buffer;
                    resolve(new File(buffer,fileName,metadata));
                }
            })
            
    }
    checkFileType(url){
        let type=url.match(/(\.jpg|\.png|\.jpeg)/g)[0].replace('.','')
        return type;
    }
}