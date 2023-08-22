import { useCallback } from 'react'
import { useDispatch, useStore } from 'react-redux';
import { formatCreatePostDraftRequest } from '@news-parser/helpers/response-formatters/PostModel';
import { formatPostOptions } from '@news-parser/helpers/response-formatters/formatPostOptions';
import { requestApi } from '@news-parser/helpers/api/requestApi';
import { configConstantsEntities, configConstantsMethods } from '@news-parser/config/constants';
import { getPostEditLink } from '@news-parser/helpers/index';
import { ParserRootState } from 'types/state';
import { WPPost, WpMedia } from 'types/post';
import { useDownloadMedia } from './useDownloadMedia';
import { insertDraftPost } from '../actions/post.actions';

namespace useCreateWpPost {
    export type WpPostResponseType = WPPost;
    export type CreateWpPostCallback = (postID?: number) => Promise<WpPostResponseType>;
    export type UseCreateWpPost = () => CreateWpPostCallback;
}

/**
* A React hook that allows creating a new WordPress post using the WP REST API.
* 
* @returns {Function} A callback function that can be used to initiate the creation of a new post.
*/

export const useCreateWpPost: useCreateWpPost.UseCreateWpPost = () => {
    const store = useStore();
    let _id: number;
    const dispatch = useDispatch();
    const [createWpMedia] = useDownloadMedia();
    const success: requestApi.RequestApiSuccess<useCreateWpPost.WpPostResponseType> = (postData) => {
        const { id } = postData;
        dispatch(insertDraftPost({ _id, post_id: id, editLink: getPostEditLink(id.toString()) }));
        return new Promise((resolve) => resolve(postData));
    };
    const error: requestApi.RequestApiError = (errorData) => {
        const { msg } = errorData;
        throw new Error(msg);
    };
    const createWpPostCallback: useCreateWpPost.CreateWpPostCallback = (postID?) => {
        const state: ParserRootState = store.getState();
        const { parsedData, options: extraOptions, dialog, sidebar } = { dialog: state.parse.dialog, sidebar: state.parse.sidebar, ...state.parse.sidebarTemplate }
        const {url} = dialog;
        if (!url) throw new Error('Error URL parametr given in dialog.url.')
        const postOptions = formatPostOptions(sidebar);
        const preparedParsedData = formatCreatePostDraftRequest(parsedData, { ...extraOptions, ...postOptions }, url);
        const options: requestApi.RequestApiOptions = { entity: configConstantsEntities.WP_POST, event: configConstantsMethods.CREATE, data: preparedParsedData };
        if (dialog._id===false) throw Error('Wrong post id givent in dialog._id')
        _id = postID ?? dialog._id;
        return requestApi(options, success, error).then((wpPostData) => createWpMedia(parsedData.image, wpPostData.title.raw, wpPostData.id).then(() => wpPostData))
    }
    return createWpPostCallback
}