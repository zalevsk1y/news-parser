import {useDispatch} from 'react-redux';
import { useCallback } from 'react';
import {openVisualConstructor} from '../../actions/dialogData.actions';

export const useOpenVisualConstructor=()=>{
    const dispatch=useDispatch();
    const openVisualConstructorHandler=useCallback((_id,url)=>dispatch(openVisualConstructor(_id,url)),[dispatch])
    return openVisualConstructorHandler;
}