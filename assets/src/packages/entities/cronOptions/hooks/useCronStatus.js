import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSelector } from 'react-redux';

export const useCronStatus=()=>{
    const dispatch=useDispatch();
    const cronState=useSelector(state=>state.parse.page?.cronOptions);
    const changeCronStatus=useCallback((status)=>dispatch(setCronStatus(status)),[dispatch])
    return [cronState,changeCronStatus]
}