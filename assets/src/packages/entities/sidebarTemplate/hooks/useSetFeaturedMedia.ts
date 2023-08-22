import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { selectFeaturedMedia } from "../actions/parsedData.actions";

namespace useSetFeaturedMedia{
    export type FeaturedMedia = (src:string)=>void
    export type UseSetFeaturedMedia=()=>FeaturedMedia
}

export const useSetFeaturedMedia:useSetFeaturedMedia.UseSetFeaturedMedia=()=>{
    const dispatch=useDispatch();
    const featuredMedia:useSetFeaturedMedia.FeaturedMedia=useCallback((src:string)=>dispatch(selectFeaturedMedia(src)),[dispatch,selectFeaturedMedia])
    return featuredMedia;
}