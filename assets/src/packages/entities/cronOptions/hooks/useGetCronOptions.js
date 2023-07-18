import { useMemo } from "react";
import {  useSelector } from "react-redux";


export const useGetCronOptions=()=>{
    const {cronOptions}=useSelector(state=>state.parse);
    const isCronOptionsSet=useMemo(()=>!!cronOptions?.url,[cronOptions])
    return [isCronOptionsSet,cronOptions]
}