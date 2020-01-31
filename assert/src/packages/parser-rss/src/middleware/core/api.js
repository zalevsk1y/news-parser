import {api} from '@news-parser/helpers/classes/Api';
import config from '@news-parser/config';
import {API_REQUEST,stopFetching,startFetching,apiSuccess,apiError} from '../../actions/api.actions';

export const apiMiddleware=({dispatch})=>next=>action=>{
    next(action);
    if (action.type.includes(API_REQUEST)){
        const {entity,event,data}=action.payload,
            method=config.api[entity][event].method,
            type=config.api[entity][event].type,
            nonce=config.api[entity][event].nonce,
            url=config.api[entity][event].url;
        dispatch(startFetching(entity,method,data))
        api.request(url,{
            type,
            method,
            nonce,
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            dispatch(apiSuccess(entity,event,data));
            dispatch(stopFetching());
        })
        //.catch(error=>dispatch(apiError(entity,event,error)))
    }
}



