import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { selectCategory,diselectCategory } from "../actions/category.actions";

export const useSelectCategory=()=>{
    const dispatch=useDispatch();
    const selectCategoryHandler=useCallback((id)=>dispatch(selectCategory(id)),[dispatch]);
    const diselectCategoryHandler=useCallback((id)=>dispatch(diselectCategory(id)),[dispatch]);;
    return [selectCategoryHandler,diselectCategoryHandler]
}