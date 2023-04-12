import { OPEN_VISUAL_CONSTRUCTOR,CLOSE_VISUAL_CONSTRUCTOR,SET_HTML } from '../actions/dialogData.actions';
import {initialState} from './initialState';

export const dialogData=(state=initialState,action)=>{
    switch(action.type){
        case OPEN_VISUAL_CONSTRUCTOR:
                const {url,_id}=action.payload;
                return {
                    ...state,
                    isOpen:true,
                    url,
                    _id
                }
            case CLOSE_VISUAL_CONSTRUCTOR:
                return {
                    ...state,
                    isOpen:false,
                    frameIsReady:false,
                    rawHTML:false
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