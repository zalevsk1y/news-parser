import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setIsMutating } from '../../actions/dialogData.actions'

namespace useSetIsMutating {
    export type SetIsMutatingState = (state: boolean) => void;
    export type UseSetIsMutating = () => SetIsMutatingState;
}

/**
 * Custom hook for setting the "isMutating" state and dispatching the corresponding action.
 *
 * @returns {Function} A function to set the "isMutating" state.
 */

export const useSetIsMutating: useSetIsMutating.UseSetIsMutating = () => {
    const dispatch = useDispatch();
    const setIsMutatingState: useSetIsMutating.SetIsMutatingState = useCallback((state) => dispatch(setIsMutating(state)), [dispatch, setIsMutating]);
    return setIsMutatingState;
}