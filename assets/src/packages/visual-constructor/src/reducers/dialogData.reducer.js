import {VISUAL_CONSTRUCTOR} from '../constants';
import { OPEN_DIALOG,CLOSE_DIALOG,FRAME_IS_READY,STOP_FETCHING,START_FETCHING } from '../actions/dialogData.actions';

import { SET_HTML } from '../actions/dialogData.actions';
import {defaultState} from './defaultState';

export const dialogData=(state=defaultState.dialogData,action)=>{
    switch(action.type){
        case OPEN_DIALOG:
                const {url,_id}=action.payload;
                return {
                    ...state,
                    isOpen:true,
                    url,
                    _id
                }
            case CLOSE_DIALOG:
                return {
                    ...state,
                    isOpen:false,
                    frameIsReady:false,
                    rawHTML:false
                }
            case START_FETCHING:
                return {
                    ...state,
                    isFetching:true
                }
            case STOP_FETCHING:
                return {
                    ...state,
                    isFetching:false
                    }
            case SET_HTML:
                return {
                    ...state,
                    rawHTML:action.payload.rawHTML
                }
            case FRAME_IS_READY:
                return {
                    ...state,
                    frameIsReady:true
                }
            default:
                return {...state,
                }
            }
        }