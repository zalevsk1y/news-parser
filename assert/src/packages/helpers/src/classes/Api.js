import {AJAX,REST,GET,POST} from '@news-parser/parser-rss/constants/index';

class Api{
    request(url,params){
        this.argsCheck({url,params});
        debugger;
        const {nonce,type,method,body}=params,
            fetchParams={
                method,
                headers:this.getHeaders(url,type,method,nonce)
            };
        if(type===AJAX&&method===GET){
            url+='&_wpnonce='+nonce;
            if(body!==undefined&& typeof body==='object'){
                url+=Object.keys(body).map(paramName=>`&${encodeURIComponent(paramName)}=${encodeURIComponent(body[paramName])}`).join('');
            }
        }else if(method===POST){
            if (body!==undefined){
                fetchParams.body=JSON.stringify(body);
            }
        }
        return fetch(url,fetchParams);
    }
    getHeaders(url,type,method,nonce){
        this.argsCheck({url,type,method,nonce});
        const headers={};
        if(type===REST){
            headers['X-WP-Nonce']=nonce;
        }
        if(method===POST){
            headers['Content-Type']='application/json';
            headers['accept']='application/json';
        }
        return headers;
    }
    argsCheck(args){
        let argNames=Object.keys(args);
        argNames.forEach(name=>{
            if (args[name]===undefined) return new Error (`Argument ${name} is undefined.`)
        })
        return true;
    }
}

export const api=new Api();