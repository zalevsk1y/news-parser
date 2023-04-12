import {useDispatch} from 'react-redux';
import {openVisualConstructor} from '../action/dialogData.actions';

export const useOpenVisualConstructor=()=>{
    const dispatch=useDispatch();
    return (_id,url)=>dispatch(openVisualConstructor(_id,url))
}