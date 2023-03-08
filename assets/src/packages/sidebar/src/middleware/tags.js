import { CRAETE_POST_TAG } from "../actions/tag.actions";
import { apiRequest } from "@news-parser/request/actions/api.actions";
import { API_SUCCESS } from "@news-parser/request/constants";
import { GET,POST, API_WP_TAGS } from "@news-parser/config/constants";
import { mapTags,pushTag,selectTag } from '@news-parser/sidebar/actions/tag.actions'


export const tagsMiddleware = ({dispatch})=>next=>action=>{
    next (action);
    switch(action.type){
        case CRAETE_POST_TAG:
            dispatch (API_WP_TAGS,GET,apiRequest(action.payload));
            break;
        case `[${API_WP_TAGS}:${POST}]`:
            dispatch (apiRequest(...Object.values(action.payload)));
            break;
        case `[${API_WP_TAGS}:${GET}]${API_SUCCESS}`:
            dispatch (mapTags(action.payload.response))
            break;
        case `[${API_WP_TAGS}:${POST}]${API_SUCCESS}`:
            const {id,name,count}=action.payload.response;
            dispatch (pushTag({id,name,count}));
            dispatch (selectTag(id))
            break;
    }
}   