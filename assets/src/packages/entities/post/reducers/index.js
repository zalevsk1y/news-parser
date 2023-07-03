import { combineReducers } from 'redux';
import {TOGGLE_POST_SELECT,INSERT_DRAFT_POST,UPDATE_POST} from '../actions/post.actions';
import {SET_LIST} from '../actions/list.actions'

export const selectPost=(state={},action)=>{
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
            return state;
    }
}
export const draftPost=(state={},action)=>{
    switch (action.type){
        case INSERT_DRAFT_POST:
            const {post_id,editLink,_id}=action.payload;
            return {
                ...state,
                ...{[_id]:{
                   post_id,
                   editLink
                }}
            };
        default:
            return state
    }
}

export const posts=(state=[],action)=>{
    switch(action.type){
        case SET_LIST:
            return [...action.payload.data];
        case UPDATE_POST:
            return state.map(post=>post._id==action.payload._id?action.payload:post);
        default:
            return state
    }
}


export const items=combineReducers({data:posts,select:selectPost,draft:draftPost})