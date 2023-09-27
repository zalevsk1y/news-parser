import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { togglePostSelect } from '../actions/post.actions';

export type UseSelectPost = ()=>(_id: number) => void


/**
 * Custom hook for selecting a post by dispatching a Redux action.
 *
 * @returns {Function} A function to select a post by dispatching the corresponding action.
 * - _id: The ID of the post to be selected.
 */

export const useSelectPost: UseSelectPost = () => {
    const dispatch = useDispatch();
    return useCallback((_id: number) => dispatch(togglePostSelect(_id)), [togglePostSelect, dispatch]);
}