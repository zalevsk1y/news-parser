import{ API_ERROR } from '../../actions/api.actions';
import { showMessage } from '@news-parser/message/';

export const errorMiddleware=({dispatch})=>next=>action=>{
    next(action);
    if(action.type.includes(API_ERROR)){
        const {type,text}=action.payload.msg;
        dispatch(showMessage(type,text))
    }
}