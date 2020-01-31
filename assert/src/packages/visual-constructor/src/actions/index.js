import {getRestNonce,getAjaxNonce,decodeHTMLEntities,getPostEditLink,sendApiRequest} from '@news-parser/helpers';
import config from '@news-parser/config';
import {PostModel} from '@news-parser/helpers/classes/PostModel';
import {TemplateModel} from '@news-parser/helpers/classes/TemplateModel'
import {fetchError,receiveError, closeDialog,receivePost,showMessage} from '@news-parser/parser-rss/actions/index'
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
/**
 * Get HTML data of the page from server.
 * 
 * @param {function} dispatch Redux dispatch function.
 * @param {string} pageUrl Url of the page. 
 */
export function getPageHTML(dispatch,pageUrl){
    let nonce=getAjaxNonce(),
        url=config.parsingApi.html+encodeURIComponent(pageUrl)+'&_wpnonce='+nonce+'&status=single';
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
/**
 * Creates Post draft using wordpress REST API.
 * 
 * @param {function} dispatch Redux dispatch function.
 * @param {string} postId Inner array post index.
 * @param {string} postUrl url of the post data source. 
 * @param {object} postData parsed post data.
 * @param {object} options parsing options.
 * 
 * @requires helpers/src/classes/PostModel.js|PostModel
 * @requires helpers/src/classes/MediaModel.js|MediaModel
 */
export function createPostDraft(dispatch,postId,postUrl,postData,options){
    const nonce=getRestNonce(),
        post=new PostModel(config.restRoot);
  
    dispatch(sendRequestToServer());
    return dispatch=>{
        return post
            .nonceAuth(nonce)
            .createPostDraft(postData,options,postUrl)
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
                    if(options.addFeaturedMedia){
                        let media= new MediaModel(config.mediaApi.create);
                        media.nonceAuth(getAjaxNonce()).create(post.featuredMedia,post.title,post.id)
                            .then(mediaData=>{
                                if(mediaData.err==0&&mediaData.data.mediaId){
                                    //post.updatePost({'featured_media':mediaData.data.mediaId})
                                }else{
                                    if(mediaData.hasOwnProperty('msg')){
                                        dispatch(showMessage(mediaData.msg.type,mediaData.msg.text));
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
/**
 * Save parsing template to server.
 * 
 * @param {function} dispatch Redux dispatch function.
 * @param {string} url url of the post data source. 
 * @param {object} postTemplateData Parsing template.
 * @param {object} options Parsing options.
 * 
 * @requires helpers/src/classes/TemplateModel.js|TemplateModel
 */
export function saveParsingTemplate(dispatch,url,postTemplateData,options){
    options.url=url;
    const nonce=getAjaxNonce(),
        template=new TemplateModel(config.optionsApi.create);
    return dispatch=>{
        return template
            .nonceAuth(nonce)
            .save(postTemplateData,options,url)
            .then(data=>{
                dispatch(closeDialog());
                if(data.err==1) dispatch(receiveError(receivedData));
                if(data.hasOwnProperty('msg'))dispatch(showMessage(data.msg.type,data.msg.text));
            })
            .catch(error=>{
                dispatch(fetchError(error))
            });    
    }
}