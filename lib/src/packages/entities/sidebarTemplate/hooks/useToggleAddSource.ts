import { useCallback } from "react";
import { useDispatch } from "react-redux"
import { toggleAddSource } from "../actions/options.actions";

export const useToggleAddSource=()=>{
    const dispatch=useDispatch();
    const addSource=useCallback(()=>dispatch(toggleAddSource()),[dispatch,toggleAddSource])
    return addSource;
}