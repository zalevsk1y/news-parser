import { apiRequest } from "@news-parser/parser-rss/actions/api.actions";
import { TEMPLATE,API } from "../constants";

export const templateMiddleware=({dispatch})=>next=>action=>{
    if((new RegExp(`${TEMPLATE}\/${API}$`,'i')).test(action.type)){
        const [entity,apiAction]=action.type.match(/\[(.*)\]/i)[1].split(':');
        dispatch(apiRequest(entity,apiAction,action.payload))
        }
    next(action);
}