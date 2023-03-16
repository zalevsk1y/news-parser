import { CREATE_POST_CATEGORY,GET_POST_CATEGORIES } from "../actions/category.actions";
import { apiRequest } from "@news-parser/request/actions/api.actions";
import { API_WP_CATEGORIES,POST,GET,API_SUCCESS } from "@news-parser/config/constants";
import { mapCategories,pushCategory,selectCategory } from '../actions/category.actions'

export const categoriesMiddleware = ({dispatch})=>next=>action=>{
    next (action);
    switch(action.type){
        case CREATE_POST_CATEGORY:
            dispatch (apiRequest(API_WP_CATEGORIES,POST,action.payload));
            break;
        case GET_POST_CATEGORIES:
            dispatch ((apiRequest(API_WP_CATEGORIES,GET,action.payload)));
            break;
        case `[${API_WP_CATEGORIES}:${GET}]${API_SUCCESS}`:
            //dispatch (mapCategories(action.payload.response))
            break;
        case `[${API_WP_CATEGORIES}:${POST}]${API_SUCCESS}`:
            const {id,name,parent}=action.payload.response;
            dispatch (pushCategory({id,name,parent}));
            dispatch (selectCategory(id))
            break;
    }
}