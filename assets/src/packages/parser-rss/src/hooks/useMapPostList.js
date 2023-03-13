import { useDispatch } from "react-redux"
import { setList } from "../actions/list.actions";

export const useMapPostList=(postsList)=>{
    const dispatch = useDispatch();
    dispatch(setList(postsList));
}