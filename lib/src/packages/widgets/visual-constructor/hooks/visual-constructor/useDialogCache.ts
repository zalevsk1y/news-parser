
import { useSelector } from "react-redux"
import { ParserRootState } from "types/state";

export type getDialogCache=(url:string)=>false|string;
export type UseDialogCache=()=>getDialogCache

export const useDialogCache:UseDialogCache=()=>{
    const {cache}=useSelector((state:ParserRootState)=>state.parse.dialog);
    return (url)=>{
        if(cache===false) return false;
        if(url in cache) {
            return cache[url];
        } else {
            return false;
        }
    }
}