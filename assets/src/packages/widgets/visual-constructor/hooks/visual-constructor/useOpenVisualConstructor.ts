import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { openVisualConstructor } from '../../actions/dialogData.actions';

export type OpenVisualConstructorHandler = (_id: number|undefined, url: string) => void;
export type UseOpenVisualConstructor = () => OpenVisualConstructorHandler;
/**
 * Custom hook for opening the visual constructor and dispatching the corresponding action.
 *
 * @returns {Function} A function that handles opening the visual constructor.
 */

export const useOpenVisualConstructor: UseOpenVisualConstructor = () => {
    const dispatch = useDispatch();
    const openVisualConstructorHandler: OpenVisualConstructorHandler = useCallback((_id, url) => dispatch(openVisualConstructor({ _id, url })), [dispatch])
    return openVisualConstructorHandler;
}