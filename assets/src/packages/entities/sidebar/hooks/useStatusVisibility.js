import { useCallback } from "react";
import { useDispatch } from "react-redux"

export const useStatusVisibility=()=>{
    const dispatch=useDispatch();
    const postStatusChangeHandler=useCallback(postStatus=>dispatch(postStatusSet(postStatus)),[dispatch]);
    const postFormatChangeHandler=useCallback(postFormat=>dispatch(postFormatSet(postFormat)),[dispatch]); 
    const publishDateChangeHandler=useCallback((date, time)=>dispatch(publishDateSet(date,time)),[dispatch]);
    return [postStatusChangeHandler,postFormatChangeHandler,publishDateChangeHandler];
}