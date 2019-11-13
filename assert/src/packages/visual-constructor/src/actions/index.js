import {getRestNonce,getAjaxNonce,getApiEndpoint,sendApiRequest,decodeHTMLEntities,getPostEditLink} from '@news-parser/helpers';
import {PostModel} from '@news-parser/helpers/classes/PostModel'
import {fetchError,receiveError, closeDialog,receivePost} from '../../../parser/src/actions/index'
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
    let nonce=getAjaxNonce(),
        url=getApiEndpoint('parsing')+'&url='+encodeURIComponent(pageUrl)+'&_wpnonce='+nonce+'&status=single';
    dispatch(sendRequestToServer());
    return dispatch=>{
        return sendApiRequest({nonce,url,method:'GET'})
                .then(response => response.text())
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
                
              
                  
    }
      
}
export function createPostDraft(postId,postUrl,postData,options,dispatch){
    let nonce=getRestNonce(),
        post=new PostModel({url:postUrl,postData,restApiRoot:getApiEndpoint('root'),options});
  
    dispatch(sendRequestToServer());
    return dispatch=>{
        return post
            .nonceAuth(nonce)
            .createPostDraft()
            .then(receive=>{
                dispatch(receiveRequestFromServer());
                dispatch(closeDialog());
                if(receive.err==0){
                    receive.msg={
                        type:"success",
                        text:'Post "'+post.title+'" was successfully parsed and save as "draft".'
                    }
                    receive.data={...receive.data,
                            status:'draft',
                            _id:postId,
                            post_id:post.id,
                            link:getPostEditLink(post.id)
                        };
                    dispatch(receivePost(postUrl,receive));
                }else{
                    dispatch(receiveError(receivedData))
                }   
            })
            .catch(error=>{
                dispatch(fetchError(error))
            });    
    }
}