import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AutopilotRootState } from 'types/state';
import { CronOptions } from 'types/cronOptions';
import { setMaxPosts } from '../actions/cronOptions.actions';

namespace useMaxPosts {
    export type MaxPosts = number;
    export type SetMaxPostsHandler = (value:MaxPosts) => void;
    export type UseMaxPosts = () => [MaxPosts, SetMaxPostsHandler]
}

/**
 * Custom hook for accessing and updating the maximum posts value from the Redux store.
 *
 * @returns {Array} An array containing the maximum posts value and a function to update the maximum posts value.
 * - maxPosts: The current maximum posts value obtained from the Redux store.
 * - setMaxPostsHandler: A function that allows updating the maximum posts value by dispatching the corresponding action.
 */

export const useMaxPosts: useMaxPosts.UseMaxPosts = () => {
    const dispatch = useDispatch();
    const maxPosts = useSelector((state: AutopilotRootState) => state.parse.cronOptions?.maxPostsParsed);
    const setMaxPostsHandler:useMaxPosts.SetMaxPostsHandler = useCallback((value:useMaxPosts.MaxPosts) => dispatch(setMaxPosts(value)), [])
    return [maxPosts, setMaxPostsHandler]
}