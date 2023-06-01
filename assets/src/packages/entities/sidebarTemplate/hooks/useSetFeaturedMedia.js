import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { selectFeaturedMedia } from "../actions/parsedData.actions";

export const useSetFeaturedMedia=()=>{
    const dispatch=useDispatch();
    const FeaturedMedia=useCallback((src)=>dispatch(selectFeaturedMedia(src)),[dispatch,selectFeaturedMedia])
    return FeaturedMedia;
}