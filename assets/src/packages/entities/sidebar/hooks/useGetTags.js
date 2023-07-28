import { useSelector } from "react-redux"

export const useGetTags=()=>{
    const {tags}=useSelector(state=>state.parse.sidebar);
    return[tags]
}