import { useCallback } from 'react';
import {useDispatch} from 'react-redux';
import { toggleSaveParsingTemplate } from '../actions/options.actions';

export const useToggleSaveParsingTemplate=()=>{
    const dispatch=useDispatch()
    const saveParsingTemplate=useCallback(()=>dispatch(toggleSaveParsingTemplate()),[toggleSaveParsingTemplate,dispatch]);
    return saveParsingTemplate;
}