import { useState,useMemo } from 'react';


export const useCategoryFilter=(categories) =>{
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
  