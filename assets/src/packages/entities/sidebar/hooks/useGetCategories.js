import { useSelector } from "react-redux"

export const useGetCategories=()=>{
    const {categories,selectedCategories}=useSelector(state=>state.parse.sidebar);
    return [categories,selectedCategories];
}