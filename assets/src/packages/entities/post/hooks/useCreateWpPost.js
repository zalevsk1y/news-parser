import { useCallback } from 'react'
import { useDispatch, useStore } from "react-redux";
import { formatCreatePostDraftRequest } from '@news-parser/helpers/response-formatters/PostModel';
import { formatPostOptions } from '@news-parser/helpers/response-formatters/formatPostOptions';
import { requestApi } from "@news-parser/helpers/api/requestApi";
import { WP_POST, CREATE } from '@news-parser/config/constants';
import { insertDraftPost, togglePostSelect } from '../actions/post.actions';
import { getPostEditLink } from "@news-parser/helpers";
import { useDownloadMedia } from './useDownloadMedia';


/**
* A React hook that allows creating a new WordPress post using the WP REST API.
* 
* @returns {Function} A callback function that can be used to initiate the creation of a new post.
*/

export const useCreateWpPost = () => {
    const store = useStore();
    let _id;
    const dispatch = useDispatch();
    const [createWpMedia] = useDownloadMedia();
    const success = (entity, event, postData) => {
        const { id } = postData;
        dispatch(insertDraftPost(_id, { post_id: id, editLink: getPostEditLink(id) }));
        return postData;
    };
    const error = (entity, event, errorData) => {
        const { msg } = errorData;
        console.error(msg.text);
        return { msg, posts: null };
    };
    const createWpPostCallback = (postId,successCallback,errorCallback) => {
        const state = store.getState();
        const { parsedData, options: extraOptions, dialogData, sidebar } = { ...state.parse.dialog, sidebar: state.parse.sidebar, ...state.parse.sidebarTemplate }
        const postOptions = formatPostOptions(sidebar);
        const preparedParsedData = formatCreatePostDraftRequest(parsedData, { generalOptions: extraOptions, postOptions }, dialogData.url);
        const options = { entity: WP_POST, event: CREATE, data: preparedParsedData };
        _id = postId??dialogData._id;
        return requestApi(options, successCallback??success, errorCallback??error).then(wpPostData => {
            return createWpMedia(parsedData.image, wpPostData.title.raw, wpPostData.id).then(()=>wpPostData)
        })
    }
    return createWpPostCallback
}