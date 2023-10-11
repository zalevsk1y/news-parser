import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { selectFeaturedMedia } from "../actions/parsedData.actions";


export type FeaturedMedia = (src:string)=>void
export type UseSetFeaturedMedia=()=>FeaturedMedia


export const useSetFeaturedMedia:UseSetFeaturedMedia=()=>{
    const dispatch=useDispatch();
    const featuredMedia:FeaturedMedia=useCallback((src:string)=>dispatch(selectFeaturedMedia(src)),[dispatch,selectFeaturedMedia])
    return featuredMedia;
}