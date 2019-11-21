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

export function hash(str){
    var hash = 0,
    char;
    if (str.length == 0) return hash;
    for (var i = 0,end=str.length; i <end ; i++) {
        char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);

}
export function getNonce(params){
    const id=config.nonce.id[params.page],
          dataset=config.nonce.dataset[params.page][params.action];
    let nonce=document.getElementById(id).dataset[dataset];
    return nonce;
}
export function getRestNonce(){
    let nonce=newsParserSettings.restApiNonce;
    return nonce;
}
export function getAjaxNonce(){
    let nonce=newsParserSettings.ajaxApiNonce;
    return nonce;
}
export function getPostEditLink(id){
    let linkTemplate=newsParserSettings.editPostLink;
    return linkTemplate.replace('$postId',id);
}
export function sendApiRequest({url,nonce,method,data}){
    let options={
        method,
        headers:{
            'X-WP-Nonce':nonce,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }
    data&&(options.body=data);
    return fetch(url,options)
}
export function getApiEndpoint(api){
    var endpoint=newsParserApiEndpoints[api];
    return endpoint;
}

export function getUrlWithParams(params){
    const url=window.location.pathname+config.root;
    let search='';
    Object.keys(params).forEach(key => {
        search+='&'+key+'='+encodeURIComponent(params[key]);
    });
    return url+search;
    }
export function decodeHTMLEntities(text) {
    var entities = [
        ['amp', '&'],
        ['apos', '\''],
        ['#x27', '\''],
        ['#x2F', '/'],
        ['#39', '\''],
        ['#47', '/'],
        ['lt', '<'],
        ['gt', '>'],
        ['nbsp', ' '],
        ['quot', '"']
    ];

    for (var i = 0, max = entities.length; i < max; ++i) 
        text = text.replace(new RegExp('&'+entities[i][0]+';', 'g'), entities[i][1]);

    return text;
}
export function decodeQuotes(text){
    return text.replace(/&quot;/g,'"');
}
export function getPluginDirUrl(){
    return newsParserSettings.pluginUrl;
}
export function combineSubReducers(parentReducer,childReducers={}){
    return (state,action)=>{
        let newState=parentReducer(state,action);
        for (var reducerName in childReducers){
        
                newState[reducerName]=childReducers[reducerName].call(this,newState[reducerName],action)
         
        }
        return newState;
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

