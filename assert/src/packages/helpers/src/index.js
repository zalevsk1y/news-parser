import config from "@news-parser/config";

export function uriToJson(uri){
    if (!uri) return {};
    const jsonParams='{\"'+uri.replace(/&/g,'","').replace(/=/g,'":"').replace(/\?/g,"")+'\"}';
    if(jsonParams){
        return JSON.parse(jsonParams);
    }
    return {};
}
export function logErrorToService(error, info){
    const parameters=config.emulateJSON?oldServerData({error,info}):newServerData({error,info});
    fetch(config.errorLogApi.report,parameters)
}
export function getLanguage(){
    const className=config.lang.class;
    return document.querySelector('.'+className).dataset['lang'].substring(0,2);
}
export function getYOffset(){
    return window.pageYOffset;
}
export function getXOffset(){
    return window.pageXOffset;
}
export function scrollTo(x,y){
    window.scrollTo(parseInt(x),parseInt(y));
}
export function getNonce(params){
    const id=config.nonce.id[params.page],
          dataset=config.nonce.dataset[params.page][params.action];
    var nonce=document.getElementById(id).dataset[dataset];
    return nonce;
}

export function getUrlWithParams(params){
    const url=window.location.pathname+config.root;
    let search='';
    Object.keys(params).forEach(key => {
        search+='&'+key+'='+encodeURIComponent(params[key]);
    });
    return url+search;
    }

export function combineSubReducers(parentReducer,childReducerName,childReducer){
    return (state,action)=>{
        var mainState=parentReducer(state,action),
            childState=childReducer(mainState[childReducerName],action);
        mainState[childReducerName]={...childState};
        return {...mainState};
    }
}
export function oldServerData(data){
    const options= {
        method: 'POST',
        headers: {
        'Accept': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded',
        
        }
   }
   if (data){
        const paramName=Object.keys(data);
        var body='';
        paramName.forEach((item)=>{
                body=+body?'&'+encodeURIComponent(item)+'='+objectToUrlEncoded(data[item]):encodeURIComponent(item)+'='+objectToUrlEncoded(data[item]);
        });
        options.body=body;
    }
   return options;
}

export function newServerData(body){
   const options= {
       method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',

    },
   
   }
   if(body) options.body=JSON.stringify(body);
   return options;
}

function objectToUrlEncoded(obj){
    return encodeURIComponent(JSON.stringify(obj))
}

let nonceSettingsPage=null;

