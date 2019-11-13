import {types} from '../actions';
import {options} from './options';
import {frame} from './frame';
import { combineSubReducers } from '@news-parser/helpers';

const defaultState={
    url:false,
    postId:false,
    type:'visualConstructor',
    parsedData:{
        image:false,
        title:false,
        body:{}
    },
    rawHTML:false,
    options:{},
    parseTemplate:{}
}

export function main(state=defaultState,action){
    switch(action.type){
        case types.DIALOG_START_FETCHING:
            return {
                ...state,
                isFetching:true
            }
        case types.DIALOG_STOP_FETCHING:
            return {
                ...state,
                isFetching:false
            }
        case types.GET_PAGE_HTML:
            return {
                ...state,
                rawHTML:action.rawHTML
            }
    
        default:
            return {...state}
    }
}

export default combineSubReducers(main,{parsedData:frame,options});