import {VISUAL_CONSTRUCTOR} from '../constants';
import { OPEN_DIALOG,CLOSE_DIALOG } from '../actions/app.actions';
import { SET_HTML } from '../actions/html.actions';
import {defaultState} from './index';

export const dialogData=(state=defaultState.dialogData,action)=>{
    switch(action.type){
        case OPEN_DIALOG:
                return {
                    ...state,
                    open:true
                }
            case CLOSE_DIALOG:
                return {
                    ...state,
                    open:false
                }
            case SET_HTML:
                return {
                    ...state,
                    rawHTML:action.payload.rawHTML
                }
            default:
                return {...state,
                }
            }
        }