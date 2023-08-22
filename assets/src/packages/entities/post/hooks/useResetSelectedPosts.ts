import { useDispatch } from 'react-redux';
import { resetSelectedPost } from '../actions/post.actions';

namespace useResetSelectedPosts{
    export type UseResetSelectedPosts=()=>()=>void
}

/**
 * Custom hook for resetting selected posts by dispatching a Redux action.
 *
 * @returns {Function} A function to reset the selected posts by dispatching the corresponding action.
 */

export const useResetSelectedPosts:useResetSelectedPosts.UseResetSelectedPosts=()=>{
    const dispatch = useDispatch();
    return ()=>dispatch(resetSelectedPost())
}
