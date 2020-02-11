import { VISUAL_CONSTRUCTOR } from '../../constants';
import { API_ERROR,API_SUCCESS,API_REQUEST } from "@news-parser/parser-rss/actions/api.actions";
import { startDialogFetching,stopsDialogFetching } from '../../actions/api.actions';

export const fetchingMiddleware=({dispatch})=>next=>action=>{
    next(action);
    const {type}=action;
    if(type.includes(API_REQUEST)&&type.includes(VISUAL_CONSTRUCTOR)){
        const {entity,event,data}=action.payload;
        dispatch(startDialogFetching(entity,event,data));
    }
    if((type.includes(API_SUCCESS)||type.includes(API_ERROR))&&type.includes(VISUAL_CONSTRUCTOR)){
        dispatch(stopsDialogFetching());
    }
}