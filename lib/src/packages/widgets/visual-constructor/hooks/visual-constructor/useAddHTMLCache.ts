import { useDispatch } from "react-redux"
import { addDialogCache } from "../../actions/dialogData.actions";

export type AddToCache=(url:string,html:string)=>void;
export type UseAddHTMLCahce =()=>AddToCache;

export const useAddHTMLCache:UseAddHTMLCahce=()=>{
    const dispatch=useDispatch();
    const addToCache:AddToCache=(url,html)=>{
        dispatch(addDialogCache({[url]:html}))
    }
    return addToCache;
}