import { useCallback } from 'react'
import { useSelector, useDispatch, useStore } from "react-redux";
import { formatCreatePostDraftRequest } from '@news-parser/helpers/response-formatters/PostModel';
import { formatPostOptions } from '@news-parser/helpers/response-formatters/formatPostOptions';
import { useSetIsMutating } from "./useSetIsMutating";
import { requestApi } from "@news-parser/helpers/api/requestApi";
import { WP_POST, CREATE } from '@news-parser/config/constants';
import { insertDraftPost } from '@news-parser/entities/post/actions';
import { getPostEditLink } from "@news-parser/helpers";

export const useCreateWpPost = () => {
    const store = useStore();
    let _id;
    const dispatch = useDispatch();
    const setIsMutating = useSetIsMutating();
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
    const createWpPostCallback = () => {
        const state=store.getState();
        const {parsedData,options:extraOptions,dialogData,sidebar}={...state.parse.dialog,sidebar:state.parse.sidebar,...state.parse.sidebarTemplate}
        setIsMutating(true);
        const postOptions = formatPostOptions(sidebar);
        const preparedParsedData = formatCreatePostDraftRequest(parsedData, { generalOptions: extraOptions, postOptions }, dialogData.url);
        const options = { entity: WP_POST, event: CREATE, data: preparedParsedData };
        _id=dialogData._id;
        return requestApi(options, success, error).then(resp => {
            setIsMutating(true);
            return resp;
        })
    }
    return createWpPostCallback
}