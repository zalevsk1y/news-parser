import { useDispatch } from "react-redux";
import {useCallback} from 'react'
import {Post} from 'types/post'
import { setList } from "../actions/list.actions";

/**
 * Custom hook for setting the posts list by dispatching a Redux action.
 *
 * @returns {Function} A function to set the posts list by dispatching the corresponding action.
 * - postsList: An array of Post objects representing the new posts list.
 */

export const useSetPostsList=()=>{
    const dispatch=useDispatch();
    return useCallback((postsList:Post[])=>dispatch(setList(postsList)),[setList,dispatch])
}