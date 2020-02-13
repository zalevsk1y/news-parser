import {AJAX,REST,GET,POST} from '@news-parser/parser-rss/constants/index';
import {BaseClass} from './BaseClass';
import config from '@news-parser/config';

class Api extends BaseClass{
    constructor(rootUrl){
        super();
        this.rootUrl=rootUrl;
    }
    request(url,params){
        this.argsCheck({url,params});
        const {nonce,type,method}=params,
            fetchParams={
                method,
                headers:this.getHeaders(url,type,method,nonce)
            };
        let {body}=params;
        if(method===GET){
            url+='&_wpnonce='+nonce;
            if(body!==undefined&& typeof body==='object'){
                url+=Object.keys(body).map(paramName=>`&${encodeURIComponent(paramName)}=${encodeURIComponent(body[paramName])}`).join('');
            }
        }else if(type===AJAX&&method===POST){
            body=body!==undefined?{...body,_wpnonce:nonce}:{_wpnonce:nonce};
            fetchParams.body=JSON.stringify(body);
        }else if(type===REST){
            fetchParams.body=JSON.stringify(body);
        }
        return fetch(url,fetchParams);
    }
    getHeaders(url,type,method,nonce){
        this.argsCheck({url,type,method,nonce});
        const headers={};
        if(type===REST){
            headers['X-WP-Nonce']=nonce;
            headers['Access-Control-Allow-Origin']=this.rootUrl!==undefined?this.rootUrl:'*';
        }
        if(method===POST){
            headers['Content-Type']='application/json';
            headers['accept']='application/json';
        }
        return headers;
    }
}

export const api=new Api(config.rootUrl);