import {Api} from '@news-parser/helpers/api/Api';
import config from '@news-parser/config';
import {API_REQUEST,apiSuccess,apiError} from '../../actions/api.actions';

export const apiMiddleware=({dispatch})=>next=>action=>{
    next(action);
    if (action.type.includes(API_REQUEST)){
        const {entity,event,data}=action.payload,
            method=config.api[entity][event].method,
            type=config.api[entity][event].type,
            nonce=config.api[entity][event].nonce,
            url=config.api[entity][event].url,
            api=new Api(config.rootUrl);
        return api.request(url,{
                type,
                method,
                nonce,
                body:data
            })
            .then(res=>{
                switch(res.headers.get('Content-Type')){
                    case 'application/json; charset=UTF-8':
                    case 'application/json':
                        return res.json();
                    default:
                        return res.text();
                };
            })
            .then(data=>{
                if(data.code&&data.code!==200){
                    dispatch(apiError(entity,event,data));
                }else{
                    dispatch(apiSuccess(entity,event,data));
                }
            })
    }
}

export const RestApiMiddleware=({dispatch})=>{
    next(action);
    if (action.type.includes(API_REQUEST)){
        const {entity,event,data}=action.payload,
            method=config.api[entity][event].method,
            type=config.api[entity][event].type,
            nonce=config.api[entity][event].nonce,
            url=config.api[entity][event].url;
       
        return api.request(url,{
                type,
                method,
                nonce,
                body:data
            })
            .then(res=>{
                switch(res.headers.get('Content-Type')){
                    case 'application/json; charset=UTF-8':
                    case 'application/json':
                        return res.json();
                    default:
                        return res.text();
                };
            })
            .then(data=>{
                if(data.code&&data.code!==200){
                    dispatch(apiError(entity,event,data));
                }else{
                    dispatch(apiSuccess(entity,event,data));
                }
            })
    }
}
export const WPApiMiddleware=({dispatch})=>next=>action=>{
    next(action);
    if (action.type.includes(WP_API_REQUEST)){
        const {entity,event,data}=action.payload;
        const method=config.api[entity][event].method,
            type=config.api[entity][event].type,
            nonce=config.api[entity][event].nonce,
            url=config.api[entity][event].url;

        return api.request(url,{
                type,
                method,
                nonce,
                body:data
        })
        .then(res=>res.json())
        .then(res=>console.log(res))
        
    }
}


