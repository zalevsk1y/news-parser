import { useCallback } from "react";
import { useDispatch } from "react-redux"
import { showMessage } from "../actions/message.actions";


export const useShowMessage=()=>{
    const dispatch=useDispatch();
    return (type,text)=>dispatch(showMessage(type,text));
}