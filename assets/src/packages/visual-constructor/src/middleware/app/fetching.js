import { VISUAL_CONSTRUCTOR } from '../../constants';
import {REQUEST_API,API_SUCCESS,API_ERROR} from "@news-parser/request/constants";
import { startFetching,stopFetching } from '../../actions/dialogData.actions';
import {closeDialog} from '../../actions/dialogData.actions';

export const fetchingMiddleware=({dispatch})=>next=>action=>{
    next(action);
    const {type}=action;
    if(type.includes(REQUEST_API)&&type.includes(VISUAL_CONSTRUCTOR)){
        const {entity,event,data}=action.payload;
        dispatch(startFetching(entity,event,data));
    }
    if((type.includes(API_SUCCESS)||type.includes(API_ERROR))&&type.includes(VISUAL_CONSTRUCTOR)){
        dispatch(stopFetching());
    }
    if(type.includes(API_ERROR)&&type.includes(VISUAL_CONSTRUCTOR)){
        dispatch(closeDialog())
    }
}