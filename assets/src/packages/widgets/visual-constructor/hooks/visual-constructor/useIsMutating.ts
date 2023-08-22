import { useDispatch, useSelector } from 'react-redux';
import { ParserRootState } from 'types/state';
import { setIsMutating } from '../../actions/dialogData.actions'

namespace useIsMutating {
    export type IsMutating = boolean;
    export type SetIsMutatingHandler = (value: boolean) => void;
    export type UseIsMutating = () => [IsMutating, SetIsMutatingHandler];
}

/**
 * Custom hook for accessing the isMutating state from the dialog.isMutating and providing a function to set its value.
 *
 * @returns {Array} A tuple containing the isMutating state and a function to set its value.
 */
export const useIsMutating: useIsMutating.UseIsMutating = () => {
    const dispatch = useDispatch();
    const isMutating = useSelector((state: ParserRootState) => state.parse.dialog.isMutating);
    const setIsMutatingHandler: useIsMutating.SetIsMutatingHandler = (value) => dispatch(setIsMutating(!!value))
    return [isMutating, setIsMutatingHandler]
}