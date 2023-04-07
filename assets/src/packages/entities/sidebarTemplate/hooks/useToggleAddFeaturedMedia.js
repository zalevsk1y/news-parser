import { useDispatch } from "react-redux";
import { useCallback } from "react";

export const useToggleAddFeaturedMedia = ()=>{
    const dispatch=useDispatch()
    toggleAddFeaturedMedia=useCallback(() => dispatch(toggleAddFeaturedMedia()), [dispatch]);
    return toggleAddFeaturedMedia
} 
