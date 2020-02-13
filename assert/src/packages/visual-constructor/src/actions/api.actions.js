
import {VISUAL_CONSTRUCTOR} from '../constants/';

export const START_FETCHING=`[${VISUAL_CONSTRUCTOR}]START_FETCHING`;
export const STOP_FETCHING=`[${VISUAL_CONSTRUCTOR}]STOP_FETCHING`;

export const startFetching=(entity,event,data)=>{
    return {
        type:START_FETCHING,
        payload:{
            entity,
            event,
            data
        }
    }
}
export const stopFetching=()=>{
    return {
        type:STOP_FETCHING
    }
}