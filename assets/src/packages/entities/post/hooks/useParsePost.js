import { PAGE, PARSE } from '@news-parser/config/constants';
import { requestApi } from "@news-parser/helpers/api/requestApi";
import { useDispatch } from "react-redux";
import { insertDraftPost, togglePostSelect } from '../actions/post.actions';
import { getPostEditLink } from "@news-parser/helpers";


/**
* A React hook that parses a post using saved parsing template and save parsed data as WP post.
* 
* @returns {Function} A callback function that can be used to initiate the parsing of the post.
* @param {string} url - The URL of the post to be parsed.
* @param {number} _id - The front end post ID that should be parsed.
*/

export const useParsePost = () => {
    const dispatch = useDispatch();
    const options = { entity: PAGE, event: PARSE, data: null };
    const parsePost = (url, _id, templateUrl) => {
        const success = (entity, event, postData) => {
            const { post_id } = postData.data;
            dispatch(togglePostSelect(_id));
            dispatch(insertDraftPost(_id, { post_id: post_id, editLink: getPostEditLink(post_id) }));
            return postData;
        };
        const error = (entity, event, errorData) => {
            const { msg } = errorData;
            console.error(msg.text);
            return { msg, posts: null };
        };
        options.data = { url, _id,templateUrl };
        return requestApi(options, success, error)
    }
    return parsePost;
}