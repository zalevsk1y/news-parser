import config from "@news-parser/config";
import {oldServerData,newServerData,getAjaxNonce} from '@news-parser/helpers'

export const types = {
    REQUEST_POSTS_LIST: 'REQUEST_POSTS_LIST',
    REQUEST_SINGLE_POST: 'REQUEST_SINGLE_POST',
    RECEIVE_POSTS_LIST: 'RECEIVE_POSTS_LIST',
    RECEIVE_SINGLE_POST: 'RECEIVE_SINGLE_POST',
    SELECT_POST:'SELECT_POST',
    RECEIVE_ERROR: 'RECEIVE_ERROR',
    SET_ROUTE: 'SET_ROUTE',
    OPEN_DIALOG:'OPEN_DIALOG',
    CLOSE_DIALOG:'CLOSE_DIALOG',
    CREATE_MESSAGE:'CREATE_MESSAGE',
    FETCH_ERROR:'FETCH_ERROR',
    OPEN_VISUAL_CONSTRUCTOR:'OPEN_VISUAL_CONSTRUCTOR',
    CLOSE_VISUAL_CONSTRUCTOR:'CLOSE_VISUAL_CONSTRUCTOR'
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
        page:params.page,
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
export function receiveError(data) {
    return {
        type: types.RECEIVE_ERROR,
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
export function selectPost(_id){
    return {
        type: types.SELECT_POST,
        _id
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
    let dialog=dialogData.dialog;
    switch(dialog.type){
        case 'gallery':
                dialog.data=dialog.data?dialog.data.map((item,key)=>{
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
        case 'visualConstructor':
                let additionalData={
                    url,
                    isFetching:false,
                    rawHTML:false,
                    parsedData:{}
                };
                dialog=Object.assign(dialog,additionalData)
            break;
    }
   
    dialogData.dialog=dialog;
    return {
        type:types.OPEN_DIALOG,
        url:url,
        data: dialogData
    }
}
export function openVisualConstructor(){
    return {
        type:types.OPEN_VISUAL_CONSTRUCTOR
    }
}
export function closeVisualConstructor(){
    return {
        type:types.CLOSE_VISUAL_CONSTRUCTOR
    }
}
export function closeDialog(){
    return {
        type:types.CLOSE_DIALOG
    }
}
export function fetchError(error){
    return {
        type:types.FETCH_ERROR,
        data:{
            error:1,
            msg:{
                type:'error',
                text:'Error connecting to the server.',
                timestamp:Date.now()
            }
        }
    }
}
export function parseRSSList(params) {
    params.dispatch(requestPostsList(params.url));
    const nonce=getAjaxNonce();
    const requestUrl=config.parsingApi.list + encodeURIComponent(params.url)+'&_wpnonce='+nonce;
    const parameters=config.emulateJSON?oldServerData(params.options):newServerData(params.options);
    return dispatch => {
        return fetch(requestUrl,parameters)
            .then(response => response.json())
            .then((json) => {
                if (!json.err) {
                    dispatch(receivePostsList(params.url, json))
                } else {
                    dispatch(receiveError( json));
                }
            })
            .catch(error=>{
                dispatch(fetchError(error))
            })
    }
}
export function parseSelected(selectedPosts,dispatch){
    return dispatch=>{
        const promise=new Promise(resolve=>{
            resolve();
        });
        selectedPosts.forEach(post=>{
            promise.then(()=>{
                return dispatch(parsePage({url:post.link,id:post._id,dispatch}))
            })
        })
        return promise;
    }
}
export function parsePage (params) {
    const dispatch=params.dispatch,
        nonce=getAjaxNonce(),
        requestUrl=config.parsingApi.multi + encodeURIComponent(params.url)+'&_wpnonce='+nonce,
        parameters=config.emulateJSON?oldServerData(params.options):newServerData(params.options);
    dispatch(requestPost(params.url,params.id));
    return dispatch => {
        return fetch(requestUrl,parameters)
            .then(response => response.json())
            .then((json) => {
                if(json){  
                    switch(true){
                        case (json.data!==undefined):
                            json.data._id = params.id;
                            dispatch(receivePost(params.url, json));
                            break;
                        case (json.err==1):
                            dispatch(receiveError( json));
                            break;
                    }
                }
            })
            .catch(error=>{
                dispatch(fetchError(error))
            })
    }
}
