import { useDispatch } from "react-redux"
import { setList } from "../../../parser-rss/src/actions/list.actions";


export const useSetPostsList=()=>{
    const dispatch=useDispatch();
    return useCallback((postsList)=>dispatch(setList(postsList)),[setList,dispatch])
}