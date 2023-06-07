import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {postStatusSet,postFormatSet,publishDateSet} from '../actions/status.visability.actions';

export const useStatusVisibility=()=>{
    const dispatch=useDispatch();
    const postStatusChangeHandler=useCallback(event=>dispatch(postStatusSet(event.target.value)),[dispatch]);
    const postFormatChangeHandler=useCallback(event=>dispatch(postFormatSet(event.target.value)),[dispatch]); 
    const publishDateChangeHandler=useCallback((date, time)=>dispatch(publishDateSet(date,time)),[dispatch]);
    return [postStatusChangeHandler,postFormatChangeHandler,publishDateChangeHandler];
}