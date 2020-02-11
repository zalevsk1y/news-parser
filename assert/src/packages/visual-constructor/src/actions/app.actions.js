import {VISUAL_CONSTRUCTOR} from '../constants/';

export const CLOSE_DIALOG=`[${VISUAL_CONSTRUCTOR}]CLOSE_DIALOG`; 
export const OPEN_DIALOG=`[${VISUAL_CONSTRUCTOR}]OPEN_DIALOG`; 

export const closeDialog=()=>{
    return {
        type:CLOSE_DIALOG
    }
}