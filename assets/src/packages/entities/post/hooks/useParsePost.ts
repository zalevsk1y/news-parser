import { configConstantsEntities, cofigConstantsEvents } from '@news-parser/config/constants';
import { requestApi } from '@news-parser/helpers/api/requestApi';
import { useDispatch } from 'react-redux';
import { getPostEditLink } from '@news-parser/helpers/index';
import { ResponseType } from '@news-parser/types';
import { Post, PostDraftData } from 'types/post';
import { insertDraftPost, togglePostSelect } from '../actions/post.actions';
import { MessageFormat } from 'types/message';

namespace useParsePost {
    export type ParsePostResponsetype = ResponseType<Post & PostDraftData>;
    export type ParsePost = (url: string, _id: number, templateUrl: string) => Promise<ParsePostResponsetype>;
    export type UseParsePost = () => ParsePost

}

/**
* A React hook that parses a post using saved parsing template and save parsed data as WP post.
* 
* @returns {Function} A callback function that can be used to initiate the parsing of the post.
* @param {string} url - The URL of the post to be parsed.
* @param {number} _id - The front end post ID that should be parsed.
*/

export const useParsePost: useParsePost.UseParsePost = () => {
    const dispatch = useDispatch();
    const options: requestApi.RequestApiOptions = { entity: configConstantsEntities.PAGE, event: cofigConstantsEvents.PARSE, data: null };
    const parsePost: useParsePost.ParsePost = (url, _id, templateUrl) => {
        const success: requestApi.RequestApiSuccess<useParsePost.ParsePostResponsetype> = (postData) => {
            const { post_id } = postData.data;
            dispatch(togglePostSelect(_id));
            dispatch(insertDraftPost({ _id, post_id, editLink: getPostEditLink(post_id.toString()) }));
            return new Promise(resolve => resolve(postData));
        };
        const error: requestApi.RequestApiError = (errorData) => {
            const { data } = errorData;
            throw new Error(data.message.text);
        };
        options.data = { url, _id, templateUrl };
        return requestApi(options, success, error)
    }
    return parsePost;
}