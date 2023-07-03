import { useSelector } from "react-redux"

export const useGetPostById=()=>{
    const posts=useSelector(state=>state.parse.items.data); 
    return (__id)=>posts.filter(post=>post._id=_id)
}