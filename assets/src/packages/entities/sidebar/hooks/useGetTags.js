import { useSelector } from "react-redux"

export const useGetTags=()=>{
    const {tags,selectedTags}=useSelector(state=>state.parse.sidebar);
    return[tags,selectedTags]
}