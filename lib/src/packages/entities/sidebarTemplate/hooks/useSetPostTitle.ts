import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { selectTitle } from "../actions/parsedData.actions";


export type SetPostTitle=(title:string)=>void;
export type UseSetPostTitle=()=>SetPostTitle


export const useSetPostTitle:UseSetPostTitle=()=>{
    const dispatch=useDispatch();
    const setPostTitle:SetPostTitle=useCallback((title:string)=>dispatch(selectTitle(title)),[dispatch,selectTitle])
    return setPostTitle;
}