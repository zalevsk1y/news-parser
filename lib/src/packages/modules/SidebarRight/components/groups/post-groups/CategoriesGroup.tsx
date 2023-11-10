import React, { useMemo,useCallback } from 'react';
import { SidebarItem } from '@news-parser/ui/sidebar/';
import { useSelectCategory } from '@news-parser/entities/sidebar/hooks';
import { useCreateCategory } from '@news-parser/entities/sidebar/hooks/';
import { useGetCategories } from '@news-parser/entities/sidebar/hooks/useGetCategories';
import { Select } from '@news-parser/components/Select';
import {SidebarItemExpandable} from '@news-parser/components/sidebar/SidebarItemExpandable'
import { useCategoryFilter } from  '../../../hooks/useCategoryFilter';
import { CategoriesOptionList } from './CategoriesOptionList';
import { CategoriesCheckboxList } from './CategoriesCheckboxList';
import { COMPONENTS } from '@news-parser/config/i18n';

/**
 * React functional component for rendering a group of categories with search, checkboxes, and add functionality.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 */

function CategoriesGroup() {
  const [categories, selected] = useGetCategories();
  const [selectCategory, deselectCategory] = useSelectCategory();
  const [filterValue, setFilterValue, filteredCategories] = useCategoryFilter(categories);
  const [newCategoryParams, newCategoryNameInputHandler, newCategoryParentSelectHandler, addCategoryHandler, isCategoriesMutating] = useCreateCategory({ parent: 0, name: '' });
  const categorySelectHandler = useCallback((event: React.FormEvent<HTMLInputElement>, id: number) => {
    const checkboxElement = event.target as HTMLInputElement;
    const checkedStatus = checkboxElement.checked;
    if (checkedStatus === undefined) return null;
    if (checkedStatus) {
      selectCategory(id);
    } else {
      deselectCategory(id);
    }
  }, [selectCategory, deselectCategory]);
  const categoryInputHandler = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const targetElement = event.target as HTMLInputElement;
    setFilterValue(targetElement.value)
  }, [setFilterValue]);
  const expandButton=useMemo(() => ({value:COMPONENTS.SIDEBAR_RIGHT.CATEGORIES_GROUP.ADD_NEW_CATEGORY,className:'pop-up-link'}),[])
  return (
    <>
      <SidebarItem>
        <div className='input-container categories-search'>
          <label htmlFor='categories-filter-input'>{COMPONENTS.SIDEBAR_RIGHT.CATEGORIES_GROUP.SEARCH_CATEGORIES}:</label>
          <input
            className='form-control'
            type='text'
            id='categories-filter-input'
            value={filterValue}
            onChange={categoryInputHandler}
          />
        </div>
      </SidebarItem>
      <SidebarItem>
        <CategoriesCheckboxList
          categories={filteredCategories}
          id={0}
          selected={selected}
          onChange={categorySelectHandler}
        />
      </SidebarItem>
      <SidebarItemExpandable
        expandButton={expandButton}
      >
        <div className='sidebar-item-expandable-row'>
          <label htmlFor='new-category-name-input'>{COMPONENTS.SIDEBAR_RIGHT.CATEGORIES_GROUP.NEW_CATEGORY_NAME}</label>
          <input
            className='form-control'
            value={newCategoryParams.name}
            type='text'
            id='new-category-name-input'
            onChange={newCategoryNameInputHandler}
           />
        </div>
        <div className='sidebar-item-expandable-row'>
          <label htmlFor='parent-category-select'>{COMPONENTS.SIDEBAR_RIGHT.CATEGORIES_GROUP.PARENT_CATEGORY}</label>
          <br />
          <Select
            id='parent-category-select'
            onChange={newCategoryParentSelectHandler}
          >
            <option value={0}>— {COMPONENTS.SIDEBAR_RIGHT.CATEGORIES_GROUP.PARENT_CATEGORY} —</option>
            <CategoriesOptionList id={0} categories={categories} />
          </Select>
        </div>
        <div className='sidebar-item-expandable-row'>
          <button
            disabled={isCategoriesMutating}
            className='btn btn-outline-secondary btn-sm'
            onClick={addCategoryHandler}
          >
            {COMPONENTS.SIDEBAR_RIGHT.CATEGORIES_GROUP.ADD_NEW_CATEGORY}
          </button>
        </div>
      </SidebarItemExpandable>
    </>
  );
}

export default CategoriesGroup;
