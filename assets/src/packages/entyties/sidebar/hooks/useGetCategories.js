import { requestApi } from "@news-parser/helpers/api/requestApi"
import { useState } from "react"
import { API_WP_CATEGORIES, GET } from "@news-parser/config/constants";
import { mapCategories } from "../actions/category.actions";
import { useDispatch } from "react-redux"

export const useGetCategories = () => {
    const [isFetching, setIsFetching] = useState(false);
    const options = { entity: API_WP_CATEGORIES, event: GET, data: null,searchParams:{page:1} };
    const categoriesArr=[];
    const dispatch = useDispatch();
    const error = (entity, event, errorData) => {
        const { msg } = errorData;
        console.error(msg.text);
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
        
    };
    const startFetching = () => {
        setIsFetching(true);
        requestApi(options, success, error)
    }
    return [isFetching, startFetching];
}