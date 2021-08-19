import {VISUAL_CONSTRUCTOR,FRAME} from '../constants/';

export const CLOSE_DIALOG=`[${VISUAL_CONSTRUCTOR}]CLOSE_DIALOG`,
        OPEN_DIALOG=`[${VISUAL_CONSTRUCTOR}]OPEN_DIALOG`,
        FRAME_IS_READY=`[${FRAME}]READY`;

export const closeDialog=()=>{
    return {
        type:CLOSE_DIALOG
    }
}

export const frameIsReady=()=>{
    return {
        type:FRAME_IS_READY
    }
}