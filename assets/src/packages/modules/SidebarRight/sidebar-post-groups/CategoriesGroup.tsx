import React, { useCallback } from 'react';
import { SidebarItem } from '@news-parser/ui/sidebar/';
import { useSelectCategory } from '@news-parser/entities/sidebar/hooks';
import { useCreateCategory } from '@news-parser/entities/sidebar/hooks/';
import { useGetCategories } from '@news-parser/entities/sidebar/hooks/useGetCategories';
import { Select } from '@news-parser/components/Select';
import {SidebarItemExpandable} from '@news-parser/components/sidebar/SidebarItemExpandable'
import { useCategoryFilter } from '../hooks/useCategoryFilter';
import { CategoriesOptionList } from './CategoriesOptionList';
import { CategoriesCheckboxList } from './CategoriesCheckboxList';

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
  const expandButtonCallback=useCallback((toggleCallback:()=>void) => (
    <button onClick={toggleCallback} className='pop-up-link'>
      Add New Category
    </button>
  ),[])
  return (
    <>
      <SidebarItem>
        <div className='input-container categories-search'>
          <label htmlFor='categories-filter-input'>Search Categories:</label>
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
        expandButton={expandButtonCallback}
      >
        <div className='sidebar-item-expandable-row'>
          <label htmlFor='category-input'>New Category Name</label>
          <input
            className='form-control'
            value={newCategoryParams.name}
            type='text'
            id='category-input'
            onChange={newCategoryNameInputHandler}
           />
        </div>
        <div className='sidebar-item-expandable-row'>
          <label htmlFor='parent-category-select'>Parent Category</label>
          <br />
          <Select
            id='arent-category-select'
            onChange={newCategoryParentSelectHandler}
          >
            <option value={0}>— Parent Category —</option>
            <CategoriesOptionList id={0} categories={categories} />
          </Select>
        </div>
        <div className='sidebar-item-expandable-row'>
          <button
            disabled={isCategoriesMutating}
            className='btn btn-outline-secondary btn-sm'
            onClick={addCategoryHandler}
          >
            Add New Category
          </button>
        </div>
      </SidebarItemExpandable>
    </>
  );
}

export default CategoriesGroup;
