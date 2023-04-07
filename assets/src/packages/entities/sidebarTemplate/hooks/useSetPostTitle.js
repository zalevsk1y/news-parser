import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { selectTitle } from "../actions/parsedData.actions";

export const useSetPostTitle=()=>{
    const dispatch=useDispatch();
    const setPostTitle=useCallback((title)=>dispatch(selectTitle(title)),[dispatch,selectTitle])
    return setPostTitle;
}