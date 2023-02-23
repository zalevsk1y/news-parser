import { apiRequest } from "../../actions/api.actions";
import { GET,POST, WP_API,CATEGORIES } from "../../constants";
import { API_SUCCESS } from "../../actions/api.actions";
import { mapCategories,mapCategory,selectCategory } from '@news-parser/sidebar/actions/category.actions'


export const wpCategoryMiddleware = ({dispatch})=>next=>action=>{
    next (action);
    switch(action.type){
        case `[${WP_API}_${CATEGORIES}:${GET}]`:
            dispatch (apiRequest(...Object.values(action.payload)));
            break;
        case `[${WP_API}_${CATEGORIES}:${POST}]`:
            dispatch (apiRequest(...Object.values(action.payload)));
            break;
        case `[${WP_API}_${CATEGORIES}:${GET}]${API_SUCCESS}`:
            dispatch (mapCategories(action.payload.response))
            break;
        case `[${WP_API}_${CATEGORIES}:${POST}]${API_SUCCESS}`:
            const {id,name,parent}=action.payload.response;
            dispatch (mapCategory({id,name,parent}));
            dispatch (selectCategory(id))
            break;
    }
}   

