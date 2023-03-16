import { useRequestApi } from "@news-parser/hooks/useRequestApi"
import { useState } from "react"
import { API_WP_CATEGORIES, GET } from "@news-parser/config/constants";
import { mapCategories } from "../actions/category.actions";
import { useDispatch } from "react-redux"

export const useGetCategories = () => {
    const [isFetching, setIsFetching] = useState(false),
        dispatch = useDispatch(),
        success = (entity, event, categories) => {
            dispatch(mapCategories(categories))
        },
        error = (entity, event, errorData) => {
            const { msg } = errorData;
            msg && dispatch(showMessage(msg.type, msg.text));
        },
        startFetching = () => {
            const options = { entity: API_WP_CATEGORIES, event: GET, data: null }
            setIsFetching(true);
            useRequestApi(options, success, error).then(setIsFetching(false))
        }
    return [isFetching, startFetching];
}