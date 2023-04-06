import { requestApi } from "@news-parser/helpers/api/requestApi"
import { useState } from "react"
import { API_WP_CATEGORIES, GET } from "@news-parser/config/constants";
import { mapCategories } from "../actions/category.actions";
import { useDispatch } from "react-redux"

export const useFetchCategories = () => {
    const [isFetching, setIsFetching] = useState(false);
    const options = { entity: API_WP_CATEGORIES, event: GET, data: null,searchParams:{page:1} };
    const categoriesArr=[];
    const dispatch = useDispatch();
    const error = (entity, event, errorData) => {
        const { msg } = errorData;
        console.error(msg.text);
        return msg;
    };
    const success = (entity, event, categories) => {    
        if(categories.length>0){
            categoriesArr.push(...categories);
            options.searchParams={page:options.searchParams.page+1}
            return requestApi(options,success,error)
        } else {
            dispatch(mapCategories(categoriesArr));
            setIsFetching(false)
        }
        return categories;
    };
    const startFetching = () => {
        setIsFetching(true);
        return requestApi(options, success, error)
    }
    return [isFetching, startFetching];
}