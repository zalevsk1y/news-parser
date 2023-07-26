import { requestApi } from "@news-parser/helpers/api/requestApi"
import { useState } from "react"
import { API_WP_CATEGORIES, GET } from "@news-parser/config/constants";
import { pushCategory } from "../actions/category.actions";
import { useDispatch } from "react-redux"

export const useFetchCategories = () => {
    const [isFetching, setIsFetching] = useState(false);
    const options = { entity: API_WP_CATEGORIES, event: GET, data: null,searchParams:{page:1} };
    const dispatch = useDispatch();
    const error = (entity, event, errorData) => {
        const { msg } = errorData;
        console.error(msg.text);
        return msg;
    };
    const success = (entity, event, categories) => {    
        if(categories.length>0){
            dispatch(pushCategory(categories));
            options.searchParams.page++;
            return requestApi(options,success,error)
        }
        return categories;
    };
    const startFetching = () => {
        options.searchParams.page=1;
        setIsFetching(true);
        return requestApi(options, success, error).then(respData=>{
            setIsFetching(false)
            return respData;
        })
    }
    return [isFetching, startFetching];
}