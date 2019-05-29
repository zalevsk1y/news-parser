import config from "@news-parser/config";
import {oldServerData,newServerData} from '@news-parser/helpers'

export const types = {
    REQUEST_POSTS_LIST: 'REQUEST_POSTS_LIST',
    REQUEST_SINGLE_POST: 'REQUEST_SINGLE_POST',
    RECEIVE_POSTS_LIST: 'RECEIVE_POSTS_LIST',
    RECEIVE_SINGLE_POST: 'RECEIVE_SINGLE_POST',
    RECEIVE_ERROR: 'RECEIVE_ERROR',
    SET_ROUTE: 'SET_ROUTE',
    OPEN_DIALOG:'OPEN_DIALOG',
    CLOSE_DIALOG:'CLOSE_DIALOG',
    CREATE_MESSAGE:'CREATE_MESSAGE'
}

export function requestPostsList(url) {
    return {
        type: types.REQUEST_POSTS_LIST, 
        url
    }
}
export function setRoute(params) {
    return {
        type: types.SET_ROUTE,
        action: params.action || false,
        url: params.url
            ? decodeURIComponent(params.url)
            : false
    }
}
export function requestPost(url,id) {
    return {
        type: types.REQUEST_SINGLE_POST, 
        url,
        id
    }
}
export function receivePostsList(url, posts) {
    return {
        type: types.RECEIVE_POSTS_LIST,
       url,
        posts,
        date: false
    }
}
export function receiveError(url, data) {
    return {
        type: types.RECEIVE_ERROR,
         url,
         data}
}
export function receivePost(url, post) {
    return {
        type: types.RECEIVE_SINGLE_POST,
        url: url,
        post,
        date: false
    }
}
export function createMessage(type,text){
    return {
        type:types.CREATE_MESSAGE,
        msg:{
            type,
            text,
            timestamp:Date.now()
        }
    }
}
export function openDialog(url,dialogData){
    const dialog=dialogData.dialog;
    switch(dialog.type){
        case 'gallery':
            var newData=dialog.data?dialog.data.map((item,key)=>{
                return {
                    id:key,
                    url:item,
                    select:false,
                    focus:false,
                    info:{
                        info:{ name:"unknown",
                        width:'unknown',
                        height:'unknown'
                         }
                    }
                    }     
                }):[];
            break;
        default:
        var newData=dialog.data;
    }
    dialogData.dialog.data=newData;
    return {
        type:types.OPEN_DIALOG,
        url:url,
        data: dialogData
    }
}
export function closeDialog(){
    return {
        type:types.CLOSE_DIALOG
    }
}
export function parseRSSList(params) {
    params.dispatch(requestPostsList(params.url));
    let requestUrl=config.parsingApi.list + encodeURIComponent(params.url)+'&_wpnonce='+params.nonce;
    return dispatch => {
        return fetch(requestUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then((json, error) => {
                error && console.error(error);
                if (!json.err) {
                    dispatch(receivePostsList(params.url, json))
                } else {
                    dispatch(receiveError(params.url, json));
                }
            })
    }
}
export function parsePage (params) {
    params.dispatch(requestPost(params.url,params.id));
    var requestUrl=config.parsingApi.single + encodeURIComponent(params.url)+'&_wpnonce='+params.nonce,
          fetchParams={
            headers:{'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
            method:'POST'
        };
    if(params.options){
        fetchParams=config.emulateJSON?oldServerData('options',params.options):newServerData({options:params.options});
    }
    return dispatch => {
        return fetch(requestUrl,fetchParams)
            .then(response => response.json())
            .then((json, error) => {
                error && console.error(error);   
                    switch(true){
                        case(json.dialog!==undefined):
                            dispatch(openDialog(params.url,json))
                            break;
                        case (json.data!==undefined):
                            json.data._id = params.id;
                            dispatch(receivePost(params.url, json));
                            break;
                        case (json.err==1):
                            dispatch(receiveError(params.url, json));
                            break;
                    }
            })
    }
}
