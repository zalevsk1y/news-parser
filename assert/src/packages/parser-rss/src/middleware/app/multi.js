import {MULTI,PARSE} from '../../../constants';
import {FETCH_MULTI,apiRequest} from '../../../actions/api.actions';
import {setMulti} from '../../../actions/set.actions';

export const multiMiddleware = ({dispatch})=>next=>action=>{
    next (action);
    switch(action.type){
        case FETCH_MULTI:
            const {data}=action.payload;
            dispatch(apiRequest(MULTI,PARSE,data));
            break;
        case `[${MULTI}:${PARSE}]${API_SUCCESS}`:
            dispatch(setMulti(action.payload))
    }
}