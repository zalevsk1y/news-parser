import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { selectCategory, diselectCategory } from "../actions/category.actions";


export type SelectCategorieHandler = (id: number) => void;
export type DiselectCategoryHandler = (id: number) => void;
export type UseSelectCategory = () => [SelectCategorieHandler, DiselectCategoryHandler]


/**
 * Custom hook for selecting and deselecting a category by dispatching Redux actions.
 *
 * @returns {Array} An array containing the functions for selecting and deselecting a category.
 * - selectCategoryHandler: A function that triggers the selection of a category by dispatching the corresponding action.
 * - diselectCategoryHandler: A function that triggers the deselection of a category by dispatching the corresponding action.
 * @param {number} id - The ID of the category to be selected or deselected.
 */

export const useSelectCategory: UseSelectCategory = () => {
    const dispatch = useDispatch();
    const selectCategoryHandler = useCallback((id: number) => dispatch(selectCategory(id)), [dispatch]);
    const diselectCategoryHandler = useCallback((id: number) => dispatch(diselectCategory(id)), [dispatch]);
    return [selectCategoryHandler, diselectCategoryHandler]
}