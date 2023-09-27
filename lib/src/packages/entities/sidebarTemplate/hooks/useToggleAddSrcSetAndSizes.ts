import { useCallback } from "react";
import { useDispatch } from "react-redux"
import { toggleAddSrcSetAndSizes } from "../actions/options.actions";

export const useToggleAddSrcSetAndSizes=()=>{
    const dispatch=useDispatch();
    const addSource=useCallback(()=>dispatch(toggleAddSrcSetAndSizes()),[dispatch,toggleAddSrcSetAndSizes])
    return addSource;
}