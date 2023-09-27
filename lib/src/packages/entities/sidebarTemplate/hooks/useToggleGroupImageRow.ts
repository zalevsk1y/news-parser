import { useCallback } from "react";
import { useDispatch } from "react-redux"
import { toggleGroupImageRow } from "../actions/options.actions";

export const useToggleGroupImageRow=()=>{
    const dispatch=useDispatch();
    const addSource=useCallback(()=>dispatch(toggleGroupImageRow()),[dispatch,toggleGroupImageRow])
    return addSource;
}