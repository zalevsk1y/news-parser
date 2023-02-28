import {combineReducers} from 'redux';


import {SET_ROUTE} from '../actions/route.actions';
import {message} from '@news-parser/message/reducers';
import {START_FETCHING,STOP_FETCHING} from '../actions/api.actions';
import {SET_LIST} from '../actions/list.actions';
import {SET_APP_STATE,CHANGE_SUBMIT_TYPE} from '../actions/app.actions'
import {POST_META} from '../actions/post.actions';
import {SELECT,DRAFT,INSERT,DELETE} from '../constants/index';
import { sidebar } from '@news-parser/sidebar/reducers';
import { initialStateParse } from './initState';
import {dialog} from './dialog'

import { template } from '@news-parser/template/reducers';


export function parse (state=initialStateParse.appState,action){

    switch(action.type){
        case START_FETCHING:
            return {...state,
                isFetching:true,
                fetchingData:{
                    ...action.payload
                }
            }
        case STOP_FETCHING:
            return {
                ...state,
                isFetching:false
            };
        case SET_APP_STATE:
            return {...state,
                    entity:action.payload.entity,
                    event:action.payload.event,
                    data:{
                        ...action.payload.data
                    }
            };
        case CHANGE_SUBMIT_TYPE:
            return {
                ...state,
                submitType:action.payload.submitType
            }
        default: 
            return {...state}
    }
}
export const selectPostMeta=(state,action)=>{
    switch (action.type){
        case `[${SELECT}:${DELETE}]${POST_META}`:
            //ES9: const {[action.payload.postId],...newState}=state
            const newState={...state},
                {_id}=action.payload;
            delete newState[_id];
            return newState;
        case `[${SELECT}:${INSERT}]${POST_META}`:
            return {
                ...state,
                ...{[action.payload._id]:true}
            };
        default:
            return {...state};
    }
}
export const draftPostMeta=(state,action)=>{
    switch (action.type){
        case `[${DRAFT}:${INSERT}]${POST_META}`:
            const {_id,post_id,editLink}=action.payload;
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

const posts=(state=[],action)=>{
    switch(action.type){
        case SET_LIST:
                return [...action.payload.data];
        default:
            return [...state]
    }
}

export function route(state={page:false},action){
 
    if(action.type===SET_ROUTE){
        return {...state,
            page:action.payload.page
        }
    }else{
        return {...state}
    }
}


const itemsReducer=combineReducers({select:selectPostMeta,draft:draftPostMeta,data:posts,}),
    parserReducer=combineReducers({appState:parse,dialog,items:itemsReducer,message,sidebar,template});
export default combineReducers({parse:parserReducer,route});