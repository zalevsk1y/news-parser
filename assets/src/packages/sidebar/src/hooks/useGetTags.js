import { useRequestApi } from "@news-parser/hooks/useRequestApi"
import { useState } from "react"
import { API_WP_TAGS, GET } from "@news-parser/config/constants";
import { mapTags } from "../actions/tag.actions";
import { useDispatch } from "react-redux"

export const useGetTags = () => {
    const [isFetching, setIsFetching] = useState(false),
        dispatch = useDispatch(),
        success = (entity, event, tags) => {
            dispatch(mapTags(tags))
        },
        error = (entity, event, errorData) => {
            const { msg } = errorData;
            msg && dispatch(showMessage(msg.type, msg.text));
        },
        startFetching = () => {
            const options = { entity: API_WP_TAGS, event: GET, data: null }
            setIsFetching(true);
            useRequestApi(options, success, error).then(setIsFetching(false))
        }
    return [isFetching, startFetching];
}