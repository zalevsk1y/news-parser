import {useDispatch} from 'react-redux';
import {useCallback} from 'react';
import {closeVisulaConstructor} from '../../actions/dialogData.actions'

export const useClose=()=>{
    const dispatch=useDispatch()
    const close=useCallback(()=>dispatch(closeVisulaConstructor()),[dispatch]);
    return close;
}

