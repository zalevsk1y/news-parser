import { requestApi } from "@news-parser/helpers/api/requestApi"
import { useState } from "react"
import { API_WP_TAGS, GET } from "@news-parser/config/constants";
import { mapTags } from "../actions/tag.actions";
import { useDispatch } from "react-redux"

export const useFetchTags = () => {
    const [isFetching, setIsFetching] = useState(false);
    const options = { entity: API_WP_TAGS, event: GET, data: null, searchParams: { page: 1 } };
    const dispatch = useDispatch();
    const tagsArr=[];
    let counter=1;
    const error = (entity, event, errorData) => {
        const { msg } = errorData;
        console.error(msg.text);
    };
    const success = (entity, event, tags) => {
        if (tags.length > 0) {
            tagsArr.push(...tags);
        options.searchParams.page++;
            return requestApi(options, success, error)
        }else{
            dispatch(mapTags(tagsArr));
            setIsFetching(false);
        }
    };
    const startFetching = () => {
        options.searchParams.page=1;
        setIsFetching(true);
        return requestApi(options, success, error)
    }
    return [isFetching, startFetching];
}