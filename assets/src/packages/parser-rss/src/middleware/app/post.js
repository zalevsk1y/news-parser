import {DELETE,INSERT,SELECT} from '../../constants';
import {setPostMeta,TOGGLE_SELECT_POST} from '../../actions/post.actions'


export const postMiddleware=({dispatch,getState})=>next=>action=>{
    next(action);
    switch(action.type){
        case TOGGLE_SELECT_POST:
            const {_id}=action.payload,
                currentPostSelectState=getState().parse.items.select[_id],
                event=currentPostSelectState?DELETE:INSERT;
            dispatch(setPostMeta(SELECT,event,_id));
            break;
      
    }
}