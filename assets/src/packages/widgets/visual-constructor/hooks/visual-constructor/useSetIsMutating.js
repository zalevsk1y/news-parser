import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { setIsMutating } from "../../actions/dialogData.actions"

export const useSetIsMutating=()=>{
    const dispatch=useDispatch();
    const setIsMutatingState=useCallback((state)=>dispatch(setIsMutating(state)),[dispatch,setIsMutating]);
    return setIsMutatingState;
}