import {combineReducers} from 'redux';


import {SET_ROUTE} from '../../../../parser-rss/src/actions/route.actions';
import {message} from '@news-parser/message/reducers';
import {START_FETCHING,STOP_FETCHING} from '../../../../parser-rss/src/actions/api.actions';
import {SET_LIST} from '../../../../parser-rss/src/actions/list.actions';
import {SET_APP_STATE,CHANGE_SUBMIT_TYPE} from '../../../../parser-rss/src/actions/app.actions'
import {POST_META} from '../../../../parser-rss/src/actions/post.actions';
import {SELECT,DRAFT,INSERT,DELETE} from '../../../../parser-rss/src/constants/index';
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