import { apiRequest } from "../../actions/api.actions";
import { GET,POST, WP_API,TAGS } from "../../constants";
import { API_SUCCESS } from "../../actions/api.actions";
import { mapTags,mapTag,selectTag } from '@news-parser/sidebar/actions/tag.actions'


export const wpTagMiddleware = ({dispatch})=>next=>action=>{
    next (action);
    switch(action.type){
        case `[${WP_API}_${TAGS}:${GET}]`:
            dispatch (apiRequest(...Object.values(action.payload)));
            break;
        case `[${WP_API}_${TAGS}:${POST}]`:
            dispatch (apiRequest(...Object.values(action.payload)));
            break;
        case `[${WP_API}_${TAGS}:${GET}]${API_SUCCESS}`:
            dispatch (mapTags(action.payload.response))
            break;
        case `[${WP_API}_${TAGS}:${POST}]${API_SUCCESS}`:
            const {id,name,count}=action.payload.response;
            dispatch (mapTag({id,name,count}));
            dispatch (selectTag(id))
            break;
    }
}   

