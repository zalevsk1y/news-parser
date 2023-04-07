import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { selectTitle } from "../actions/parsedData.actions";

export const useSetFeaturedMedia=()=>{
    const dispatch=useDispatch();
    const FeaturedMedia=useCallback((src)=>dispatch(selectFeaturedMedia(src)),[dispatch,selectTitle])
    return FeaturedMedia;
}