import { useDispatch } from "react-redux";
import { requestApi } from "@news-parser/helpers/api/requestApi";
import { API_WP_TAGS, POST } from "@news-parser/config/constants";
import { pushTag } from '../actions/tag.actions';
import { useState } from "react";

export const useCreateTag = () => {
    const dispatch = useDispatch();
    const [isMutating, setIsMutating] = useState(false);
    const success = (entity, event, tag) => {
        const { name, id } = tag;
        dispatch(pushTag({ name, id }));
        return { name, id };
    };
    const error = (entity, event, errorData) => {
        const { msg } = errorData;
        throw errorData;
    };
    const createTag = (tagName) => {
        const options = { entity: API_WP_TAGS, event: POST, data: { name: tagName } };
        setIsMutating(true);
        return requestApi(options, success, error).finally(() =>{
            setIsMutating(false)
        });
    };
    return [isMutating, createTag];
} 