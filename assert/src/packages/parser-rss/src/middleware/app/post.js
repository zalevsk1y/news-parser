import {DELETE,INSERT,SELECT} from '../../constants/';
import {setPostMeta,TOGGLE_SELECT_POST} from '../../actions/post.actions'

export const postMiddleware=store=>next=>action=>{
    next(action);
    switch(action.type){
        case TOGGLE_SELECT_POST:
            const {dispatch,getState}=store,
            {_id}=action.payload,
            currentPostSelectState=getState().parse.items.select[_id],
            event=currentPostSelectState?DELETE:INSERT;
            console.log(action);
            dispatch(setPostMeta(SELECT,event,_id));
    }
}