import { apiRequest } from "../../actions/api.actions";
import { GET, WP_API,CATEGORIES } from "../../constants";
import { API_SUCCESS,API_REQUEST,API_ERROR } from "../../actions/api.actions";
import { mapCategories } from '@news-parser/sidebar/actions/app.actions'

export const wpMiddleware = ({dispatch})=>next=>action=>{
    next (action);
    switch(action.type){
        case `[${WP_API}_${CATEGORIES}:${GET}]`:
            dispatch (apiRequest(...Object.values(action.payload)));
            break;
        case `[${WP_API}_${CATEGORIES}:${GET}]${API_SUCCESS}`:
            dispatch (mapCategories(action.payload.response))
    }
}   

