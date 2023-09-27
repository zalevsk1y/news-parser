import { useCallback } from "react";
import { useDispatch } from "react-redux"
import { resetSidebarTemplate } from "../actions/parsedData.actions";

export const useResetSidebarTemplate=()=>{
    const dispatch=useDispatch();
    const resetData=useCallback(()=>dispatch(resetSidebarTemplate()),[dispatch])
    return resetData
}
