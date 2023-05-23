import { useCallback } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { formatCreatePostDraftRequest } from '@news-parser/helpers/response-formatters/PostModel';
import { formatPostOptions } from '@news-parser/helpers/response-formatters/formatPostOptions';
import { useSetIsMutating } from "./useSetIsMutating";
import { requestApi } from "@news-parser/helpers/api/requestApi";
import { WP_POST, CREATE } from '@news-parser/config/constants';
import { insertDraftPost } from '@news-parser/entities/post/actions';
import { getPostEditLink } from "@news-parser/helpers";

export const useCreateWpPost = () => {
    const { parsedData, options, dialogData, _id } = useSelector(state => state.parse.dialog.dialogData);
    const dispatch = useDispatch();
    const setIsMutating = useSetIsMutating()
    const success = (entity, event, postData) => {
        const { title, id } = postData;
        dispatch(insertDraftPost(_id, { post_id: id, editLink: getPostEditLink(id) }))
        dispatch(setList(posts));
        return msg
    };
    const error = (entity, event, errorData) => {
        const { msg } = errorData;
        console.error(msg.text);
        return { msg, posts: null };
    };
    const createWpPostCallback = useCallback(() => {
        setIsMutating(true);
        const options = { entity: WP_POST, event: CREATE, data: preparedParsedData };
        const postOptions = formatPostOptions(getState().parse.sidebar);
        const preparedParsedData = formatCreatePostDraftRequest(parsedData, { generalOptions: options, postOptions }, dialogData.url);
        return requestApi(options, success, error).then(() => {
            setIsMutating(true);
        })
    }, [parsedData, options, dialogData])
    return [createWpPostCallback]
}