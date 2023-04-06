import { useDispatch } from "react-redux";
import { requestApi } from "@news-parser/helpers/api/requestApi";
import { API_WP_TAGS, POST } from "@news-parser/config/constants";
import { pushTag, selectTag } from '../actions/tag.actions'
import { showMessage } from "@news-parser/message/actions/";
import { useCallback, useState } from "react";

export const useCreateTag = (tags) => {
    const dispatch = useDispatch();
    const [isFetching, startFetching] = useFetchingTags();
    const [isMutating, setIsMutating] = useState(false);
    const success = (entity, event, tag) => {
        startFetching().then(() => {
            dispatch(selectTag(tag.id));
            setIsMutating(false)
        })
        return tag;

    };
    const error = (entity, event, errorData) => {
        const { msg } = errorData;
        setIsMutating(false)
        return msg;
    };
    const createTag = useCallback((tag) => {
        const options = { entity: API_WP_TAGS, event: POST, data: tag };
        setIsMutating(true);
        requestApi(options, success, error);
    }, [tags])
    return [isFetching, createTag];
} 