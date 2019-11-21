import {getRestNonce,getAjaxNonce,getApiEndpoint,sendApiRequest,decodeHTMLEntities,getPostEditLink} from '@news-parser/helpers';
import {PostModel} from '@news-parser/helpers/classes/PostModel'
import {fetchError,receiveError, closeDialog,receivePost,createMessage} from '@news-parser/parser-rss/actions/index'
import { MediaModel } from '@news-parser/helpers/classes/MediaModel';
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
    const nonce=getRestNonce(),
        post=new PostModel({url:postUrl,postData,restApiRoot:getApiEndpoint('root'),options});
  
    dispatch(sendRequestToServer());
    return dispatch=>{
        return post
            .nonceAuth(nonce)
            .createPostDraft()
            .then(postData=>{
                dispatch(receiveRequestFromServer());
                dispatch(closeDialog());
                    let receive={};
                    receive.msg={
                        type:"success",
                        text:'Post "'+post.title+'" was successfully parsed and save as "draft".'
                    }
                    receive.data={
                            status:'draft',
                            _id:postId,
                            post_id:post.id,
                            link:getPostEditLink(post.id),
                            postData
                        };
                    if(!options.noFeaturedMedia){
                        let media= new MediaModel(getApiEndpoint('media'));
                        media.nonceAuth(getAjaxNonce()).create(post.featuredMedia,post.title,post.id)
                            .then(mediaData=>{
                                if(mediaData.err==0&&mediaData.data.mediaId){
                                    post.updatePost({'featured_media':mediaData.data.mediaId})
                                }else{
                                    if(mediaData.hasOwnProperty('msg')){
                                        dispatch(createMessage(mediaData.msg.type,mediaData.msg.text));
                                    }
                                }
                            })
                            
                    }
                    dispatch(receivePost(postUrl,receive)); 
            })
            .catch(error=>{
                dispatch(fetchError(error))
            });    
    }
}