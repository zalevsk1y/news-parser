
import { API_SUCCESS,API_REQUEST,API_ERROR } from "../../actions/api.actions";
import { PARSER_RSS } from '../../constants'
import { startFetching,stopFetching } from "../../actions/api.actions";


export const fetchingMiddleware=({dispatch})=>next=>action=>{
    next(action);
    const {type}=action;
    if(type.includes(PARSER_RSS)&&type.includes(API_REQUEST)){
        const {entity,event,data}=action.payload;
        dispatch(startFetching(entity,event,data));
    }
    if(type.includes(PARSER_RSS)&&(type.includes(API_SUCCESS)||type.includes(API_ERROR))){
        dispatch(stopFetching());
    }
}