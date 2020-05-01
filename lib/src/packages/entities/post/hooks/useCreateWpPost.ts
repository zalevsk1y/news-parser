import { useDispatch, useStore } from 'react-redux';
import { formatCreatePostDraftRequest } from '@news-parser/helpers/response-formatters/formatCreatePostDraftRequest';
import { formatPostOptions } from '@news-parser/helpers/response-formatters/formatPostOptions';
import { requestApi,RequestApiError,RequestApiOptions,RequestApiSuccess } from '@news-parser/helpers/api/requestApi';
import { configConstantsEntities, configConstantsMethods } from '@news-parser/config/constants';
import { getPostEditLink } from '@news-parser/helpers/index';
import { ParserRootState } from 'types/state';
import { WPPost } from 'types/post';
import { useDownloadMedia } from './useDownloadMedia';
import { insertDraftPost } from '../actions/post.actions';


export type WpPostResponseType = WPPost;
export type CreateWpPostCallback = (postID?: number) => Promise<WpPostResponseType>;
export type UseCreateWpPost = () => CreateWpPostCallback;


/**
* A React hook that allows creating a new WordPress post using the WP REST API.
* 
* @returns {Function} A callback function that can be used to initiate the creation of a new post.
*/

export const useCreateWpPost: UseCreateWpPost = () => {
    const store = useStore();
    let _id: number;
    const dispatch = useDispatch();
    const [createWpMedia] = useDownloadMedia();
    const success: RequestApiSuccess<WpPostResponseType> = (postData) => {
        const { id } = postData;
        dispatch(insertDraftPost({ _id, post_id: id, editLink: getPostEditLink(id.toString()) }));
        return new Promise((resolve) => resolve(postData));
    };
    const error: RequestApiError = (errorData) => {
        const { data } = errorData;
        throw new Error(data.message.text);
    };
    const createWpPostCallback: CreateWpPostCallback = (postID?) => {
        const state: ParserRootState = store.getState();
        const { parsedData, options: extraOptions, dialog, sidebar } = { dialog: state.parse.dialog, sidebar: state.parse.sidebar, ...state.parse.sidebarTemplate }
        const {url} = dialog;
        if (!url) throw new Error('Error URL parametr given in dialog.url.')
        const postOptions = formatPostOptions(sidebar);
        const preparedParsedData = formatCreatePostDraftRequest(parsedData, { ...extraOptions, ...postOptions }, url);
        const options: RequestApiOptions = { entity: configConstantsEntities.WP_POST, event: configConstantsMethods.CREATE, data: preparedParsedData };
        if (dialog._id!==false) {
            _id = dialog._id;
        }else if(postID!==undefined){
            _id=postID;
        }else{
            Error('Wrong post id givent.');
        } 
        return requestApi(options, success, error).then((wpPostData) => createWpMedia(parsedData.image, wpPostData.title.raw, wpPostData.id).then(() => wpPostData))
    }
    return createWpPostCallback
}