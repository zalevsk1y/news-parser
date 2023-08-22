import { useSelector } from 'react-redux';
import { ParserRootState } from 'types/state';


namespace useGetCategories {
    export type Categories = ParserRootState['parse']['sidebar']['categories'];
    export type SelectedCategories = ParserRootState['parse']['sidebar']['selectedCategories'];
    export type UseGetCategories = () => [Categories, SelectedCategories]
}

/**
 * Custom hook for retrieving categories from the Redux store.
 *
 * @returns {Array} An array containing the categories and selected categories.
 * - categories: An array of categories obtained from the Redux store.
 * - selectedCategories: An array of selected categories obtained from the Redux store.
 */

export const useGetCategories: useGetCategories.UseGetCategories = () => {
    const { categories, selectedCategories } = useSelector((state: ParserRootState) => state.parse.sidebar);
    return [categories, selectedCategories];
}