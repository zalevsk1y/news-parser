import { combineReducers } from 'redux';
import { Action } from '@news-parser/types';
import { Post } from 'types/post';
import {TOGGLE_POST_SELECT,INSERT_DRAFT_POST,UPDATE_POST, RESET_SELECTED_POST} from '../actions/post.actions';
import {SET_LIST} from '../actions/list.actions'

export const selectPost=(state:Record<string,boolean>|object={},action:Action)=>{
    switch (action.type){
        case TOGGLE_POST_SELECT:
            if (action.payload in state){
                const newState={...state};
                delete newState[action.payload];
                return newState;
            }
            return {
                ...state,
                ...{[action.payload]:true}
            };
        
        case RESET_SELECTED_POST:
            return {};
        default:
            return state;
    }
}
export const draftPost=(state:Record<string,boolean>|object={},action:Action)=>{
    switch (action.type){
        case INSERT_DRAFT_POST:
            return {
                ...state,
                ...{[action.payload._id]:{
                   post_id:action.payload.post_id,
                   editLink:action.payload.editLink
                }}
            };
        default:
            return state
    }
}

export const posts=(state:Array<Post>=[],action:Action)=>{

    switch(action.type){
        case SET_LIST:
            return [...action.payload];
        case UPDATE_POST:
            return state.map(post=>post._id==action.payload._id?action.payload:post);
        default:
            return state
    }
}


export const items=combineReducers({data:posts,select:selectPost,draft:draftPost})