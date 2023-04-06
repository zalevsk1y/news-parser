import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {allowPinbacksSet,allowCommentsSet} from '../actions/descussion.actions';


export const useSelectDiscussionGroup=()=>{
    const dispatch=useDispatch();
    const allowComments=useCallback(()=>{},[dispatch(allowCommentsSet())]);
    const allowPinbacks=useCallback(()=>{},[dispatch(allowPinbacksSet())]);
    return [allowComments,allowPinbacks];
}