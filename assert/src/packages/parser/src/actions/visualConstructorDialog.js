import {getRestNonce,getApiEndpoint,sendApiRequest,decodeHTMLEntities} from '@news-parser/helpers';
import {fetchError,receiveError} from './index'
export const types = {
    GET_PAGE_HTML: 'GET_PAGE_HTML',
    DIALOG_START_FETCHING: 'DIALOG_START_FETCHING',
    DIALOG_STOP_FETCHING: 'DIALOG_STOP_FETCHING',
}

export function sendRequestToServer(){
    return {
        type:types.DIALOG_START_FETCHING
    }
}
export function receiveRequestFromServer(){
    return {
        type:types.DIALOG_STOP_FETCHING
    }
}
export function getPostHTML(htmlData){

    let receivedObject=decodeHTMLEntities(htmlData);

    return {
        type:types.GET_PAGE_HTML,
        rawHTML:receivedObject
    }
}

export function getPageHTML(pageUrl,dispatch){
    let nonce=getRestNonce(),
        url=getApiEndpoint('visualConstructor')+encodeURIComponent(pageUrl);
    dispatch(sendRequestToServer());
    return dispatch=>{
        return sendApiRequest({nonce,url,method:'GET'})
                .then(response => response.json())
                .then(json=>{
                    dispatch(receiveRequestFromServer());
                    try{
                        var receivedData=JSON.parse(json);
                    }catch(e){
                        receivedData=json;
                    }
                    
                    if(receivedData.hasOwnProperty('err')&&receivedData.err==1){
                        dispatch(receiveError(receivedData));
                    }
                   
                    dispatch(getPostHTML(receivedData))
                   
                })
                
                .catch(error=>{
                    dispatch(fetchError(error));
                })
                  
    }
      
}