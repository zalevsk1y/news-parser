import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { closeVisualConstructor } from '../../actions/dialogData.actions'

export const useClose = () => {
    const dispatch = useDispatch()
    const close = useCallback(() => dispatch(closeVisualConstructor()), [dispatch]);
    return close;
}

