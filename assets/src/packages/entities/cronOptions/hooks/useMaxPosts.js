import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMaxPosts } from "../../../entities/cronOptions/actions/cronOptions.actions";


export const useMaxPosts=()=>{
    const dispatch=useDispatch();
    const maxPosts=useSelector(state=>state.parse.cronOptions?.maxPostsParsed);
    const setMaxPostsHandler=useCallback((value)=>dispatch(setMaxPosts(value)),[])
    return [maxPosts,setMaxPostsHandler]
}