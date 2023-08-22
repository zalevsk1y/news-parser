import { useState, useMemo } from 'react';
import { Category } from 'types/sidebar';

type GetParent = (categoryObj: Category, categoriesArr: Category[]) => Category | undefined;
type FilterWithParent = (categoryName: string, categories: Category[]) => Category[]

namespace useCategoryFilter {
  export type FilterValue = string;
  export type SetFilterValue=(filterValue:FilterValue)=>void;
  export type UseCategoryFilter=(categries:Category[])=>[FilterValue,SetFilterValue,Category[]];
}

/**
 * 
 * A custom React hook that provides category filtering functionality.
 * 
 * @param {Array} categories - An array of category objects.
 * @returns {Array} An array containing the filter value, a function to set the filter value, and an array of filtered categories.
 * @since 2.0.0 
 */

export const useCategoryFilter:useCategoryFilter.UseCategoryFilter = (categories) => {
  const [filterValue, setFilterValue] = useState<useCategoryFilter.FilterValue>("");
  const filteredCategories: Category[] = useMemo(() => {
    const filterWithParent: FilterWithParent = (categoryName, categories) => {
      const getParent: GetParent = (categoryObj, categoryArr) =>
        categoryArr.find(
          (categoryItem) => categoryItem.id === categoryObj.parent
        );
      const filteredCategories = categories.filter((category) =>
        category.name.includes(categoryName)
      );
      filteredCategories.forEach((categoryItem) => {
        const parentCategoryItem = getParent(categoryItem, categories);
        if (parentCategoryItem !== undefined) {
          filteredCategories.findIndex(
            (categoryItem) => categoryItem.id === parentCategoryItem?.id
          ) === -1 &&
            filteredCategories.push(parentCategoryItem);
        }
      });
      return filteredCategories;
    };

    return filterWithParent(filterValue, categories);
  }, [filterValue, categories]);

  return [filterValue, setFilterValue, filteredCategories];
}
