import {MEDIA,CREATE} from '../../../constants';
import {MEDIA_CREATE,apiRequest} from '../../../actions/api.actions';


export const mediaMiddleware = ({dispatch})=>next=>action=>{
    next (action);
    switch(action.type){
        case MEDIA_CREATE:
            const {data}=action.payload;
            dispatch(apiRequest(MEDIA,CREATE,data));
            break;
    }
}