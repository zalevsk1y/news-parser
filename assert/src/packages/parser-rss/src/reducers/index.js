import {combineReducers} from 'redux';
import {types} from '../actions';
import {initialStateParse,initialStateRoute} from './initState';
import {combineSubReducers,decodeQuotes} from '@news-parser/helpers';
import {LIST} from '../constants/index';
import {START_FETCHING,STOP_FETCHING} from '../actions/api.actions';
import {SET_LIST} from '../actions/list.actions';
import {SET_APP_STATE} from '../actions/app.actions'
import {POST_META} from '../actions/post.actions';
import {SELECT,DRAFT,INSERT,DELETE} from '../constants/index';

import dialog from './dialog'


export function parse (state=initialStateParse,action){

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
                appState:{
                    ...state.appState,
                    entity:action.payload.entity,
                    event:action.payload.event,
                    data:{
                        ...action.payload.data
                    }
                }
            };
        case types.REQUEST_SINGLE_POST:
            const actionParams=action.id?{postID:action.id}:false;
            return {...state,isFetching:true,url:action.url,action:'post',actionParams};
        
        case types.RECEIVE_SINGLE_POST:
            if(action.post.data._id!==undefined){
                state.items.data[action.post.data._id].status=action.post.data.status;
                state.items.data[action.post.data._id].postId=action.post.data.post_id;
                state.items.data[action.post.data._id].editLink=action.post.data.link;
            }
            if(action.post.msg)action.post.msg.text=decodeQuotes(action.post.msg.text);
            return {...state,
                isFetching:false,
                url:action.url,
                action:'main',
                message:action.post.msg,
                error:action.post.err
            };
        case types.SELECT_POST:
            if(state.items.data[action._id].status!=='selected'){
                state.items.data[action._id].status='selected';
            } else if(state.items.data[action._id].status==='selected'){
                state.items.data[action._id].status='parsed';
            }
            return {...state,
                items:{...state.items,
                    data:[...state.items.data]
                }
            }
        case types.OPEN_DIALOG:
 
            return {...state,
                isFetching:false,
                url:action.url,
                action:'dialog',
                message:action.data.msg,
                error:action.data.err,
                dialog:action.data.dialog
            };
        case types.CLOSE_DIALOG:
            return {...state,
                 action:'main',
                 dialog:false
            }
   
        case types.FETCH_ERROR:
            return {
                ...state,
                isFetching:false,
                url:false,
                action:'main',
                message:action.data.msg,
                error:action.data.err,
                actionParams:false
            }
        case types.RECEIVE_ERROR:
            return{...state,
                isFetching:false,
                url:false,
                action:'main',
                message:action.data.msg,
                error:action.data.err,
                actionParams:false
            }
        case types.CREATE_MESSAGE:
            return{...state,
                message:action.msg}
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
            console.log(action)
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
 
    if(action.type===types.SET_ROUTE){
        return {...state,
            page:action.payload.page
        }
    }else{
        return {...state}
    }
}


const postMetaReducer=combineReducers({select:selectPostMeta,draft:draftPostMeta,data:posts}),
    parserReducer=combineSubReducers(parse,{dialog,items:postMetaReducer});
export default combineReducers({parse:parserReducer,route});