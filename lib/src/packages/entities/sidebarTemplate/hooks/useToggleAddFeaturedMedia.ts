import { useDispatch } from "react-redux";
import { useCallback } from "react";
import {toggleAddFeaturedMedia} from '../actions/options.actions'

export const useToggleAddFeaturedMedia = ()=>{
    const dispatch=useDispatch();
    const toggleAddFeaturedMediaHandler=useCallback(() => dispatch(toggleAddFeaturedMedia()), []);
    return toggleAddFeaturedMediaHandler
} 
