import { useDispatch } from 'react-redux';
import { resetSelectedPost } from '../actions/post.actions';

export const useResetSelectedPosts=()=>{
    const dispatch = useDispatch();
    return ()=>dispatch(resetSelectedPost())
}
