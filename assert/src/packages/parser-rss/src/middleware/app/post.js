import {DELETE,INSERT,SELECT} from '../../constants/';
import {setPostMeta,TOGGLE_SELECT_POST} from '../../actions/post.actions'
import { showMessage } from '../../actions';

export const postMiddleware=store=>next=>action=>{
    next(action);
    switch(action.type){
        case TOGGLE_SELECT_POST:
            const {_id}=action.payload,
            currentPostSelectState=store.getState().parse.items.select[_id],
            event=currentPostSelectState?DELETE:INSERT;
            store.dispatch(setPostMeta(SELECT,event,_id));
            break;
      
    }
}