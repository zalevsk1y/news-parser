import { useState, useMemo } from 'react';
import { Category } from 'types/sidebar';

namespace useCategoryFilter{
  export type FilterValue=string;
  export type SetFilterValue=React.Dispatch<React.SetStateAction<string>>
  export type FilteredCategories=Array<Category>
  export type UseCategoryFilter=(categories:Array<Category>)=>[FilterValue,SetFilterValue,FilteredCategories]
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
  const [filterValue, setFilterValue] = useState<string>("");
  const filteredCategories:useCategoryFilter.FilteredCategories = useMemo(() => {
    const filterWithParent = (categoryName:string, categories:Array<Category>):Array<Category> => {
      const getParent = (categoryObj:Category, categoryArr:Array<Category>) =>
        categoryArr.find(
          (categoryItem) => categoryItem.id === categoryObj.parent
        ) || false;
      const filteredCategories:Array<Category> = categories.filter((category) =>
        category.name.includes(categoryName)
      );
      filteredCategories.forEach((categoryItem) => {
        const parentCategoryItem = getParent(categoryItem, categories);
        if(parentCategoryItem!==false) {
          const parentCategorieId=parentCategoryItem.id;
          filteredCategories.findIndex(
            (categoryItem) => categoryItem.id === parentCategorieId
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
