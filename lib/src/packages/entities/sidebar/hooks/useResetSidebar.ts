import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { resetSidebar } from '../actions/main.actions'

/**
 * Custom hook for resetting the sidebar by dispatching a Redux action.
 *
 * @returns {Function} A function to reset the sidebar by dispatching the corresponding action.
 */

export const useResetSidebar = () => {
    const dispatch = useDispatch();
    return useCallback(() => dispatch(resetSidebar()), [dispatch]);
}