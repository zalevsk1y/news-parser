import { useState, useMemo } from 'react';

/**
 * 
 * A custom React hook that provides category filtering functionality.
 * 
 * @param {Array} categories - An array of category objects.
 * @returns {Array} An array containing the filter value, a function to set the filter value, and an array of filtered categories.
 * @since 2.0.0 
 */

export const useCategoryFilter = (categories) => {
  const [filterValue, setFilterValue] = useState("");
  const filteredCategories = useMemo(() => {
    const filterWithParent = (categoryName, categories) => {
      const getParent = (categoryObj, categoryArr) =>
        categoryArr.find(
          (categoryItem) => categoryItem.id === categoryObj.parent
        ) || false;
      const filteredCategories = categories.filter((category) =>
        category.name.includes(categoryName)
      );
      filteredCategories.forEach((categoryItem) => {
        let parentCategoryItem = getParent(categoryItem, categories);
        parentCategoryItem &&
          filteredCategories.findIndex(
            (categoryItem) => categoryItem.id === parentCategoryItem.id
          ) === -1 &&
          filteredCategories.push(parentCategoryItem);
      });
      return filteredCategories;
    };

    return filterWithParent(filterValue, categories);
  }, [filterValue, categories]);

  return [filterValue, setFilterValue, filteredCategories];
}
