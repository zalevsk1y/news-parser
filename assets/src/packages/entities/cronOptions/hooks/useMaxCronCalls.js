import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMaxCronCalls } from "../../../entities/cronOptions/actions/cronOptions.actions";



export const useMaxCronCalls=()=>{
    const dispatch=useDispatch();
    const maxCronCalls=useSelector(state=>state.parse.cronOptions?.maxCronCalls);
    const setMaxCronCallsHandler=useCallback((value)=>{
        dispatch(setMaxCronCalls(value))
    },[]);
    return [maxCronCalls,setMaxCronCallsHandler];
}