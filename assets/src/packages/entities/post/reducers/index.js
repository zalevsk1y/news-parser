import {TOGGLE_POST_SELECT} from '../actions/post.actions';
import {INSERT_DRAFT_POST} from '../actions/post.actions';

export const selectPostMeta=(state,action)=>{
    switch (action.type){
        case TOGGLE_POST_SELECT:
            const {_id}=action.payload;
            if (state.hasOwnProperty(_id)){
            const newState={...state};
            delete newState[_id];
            return newState;
            }else{
            return {
                ...state,
                ...{[_id]:true}
            };
        }
        default:
            return {...state};
    }
}
export const draftPostMeta=(state,action)=>{
    switch (action.type){
        case INSERT_DRAFT_POST:
            const {post_id,editLink}=action.payload.data;
            const {_id}=action.payload;
            return {
                ...state,
                ...{[_id]:{
                   post_id,
                   editLink
                }}
            };
        default:
            return {...state}
    }
}