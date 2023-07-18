import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInterval } from "../../../entities/cronOptions/actions/cronOptions.actions";



export const useInterval=()=>{
    const dispatch=useDispatch();
    const interval=useSelector(state=>state.parse.cronOptions?.interval);
    const setIntervalHandler=useCallback((value)=>dispatch(setInterval(value)),[]);
    return [interval,setIntervalHandler];
}