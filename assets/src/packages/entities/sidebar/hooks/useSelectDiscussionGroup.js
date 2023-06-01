import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {allowPinbacksSet,allowCommentsSet} from '../actions/descussion.actions';


export const useSelectDiscussionGroup=()=>{
    const dispatch=useDispatch();
    const allowComments=useCallback((event)=>dispatch(allowCommentsSet(!!event.target.value)),[]);
    const allowPinbacks=useCallback((event)=>dispatch(allowPinbacksSet(!!event.target.value)),[]);
    return [allowComments,allowPinbacks];
}