import { useCallback } from "react";
import { useDispatch } from "react-redux"

export const useSelectPost=()=>{
    const dispatch=useDispatch();
    const toggleSelectPost=useCallback((_id)=>dispatch(togglePostSelect(_id)),[togglePostSelect,dispatch]);
    return toggleSelectPost;
}