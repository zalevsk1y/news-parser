import React, { useCallback, useEffect } from "react";
import { CategoriesCheckboxList } from "../../components/CategoriesCheckboxList";
import { CategoiresOptionList } from "../../components/CategoiresOptionList";
import { Select } from "../../components/Select";
import { SidebarItem } from "../../components/SidebarItem";
import { SidebarItemsGroup } from "../../components/SidebarItemsGroup";
import { SidebarItemExpandable } from "../../components/SidebarItemExpandable";
import {useSelectCategory} from "@news-pareser/entyties/sidebar/hooks";
import { useDispatch, useSelector } from "react-redux";

import { useCategoryFilter } from "../../hooks/useCategoryFilter";
import { useCreateCategory } from "../../hooks/useCreateCategory";
import "@news-parser/styles/sidebar/_input-container.scss";
import "@news-parser/styles/sidebar/_categories-group.scss";


import { useGetCategories } from "@news-parser/sidebar/hooks/useGetCategories";

/**
* Renders a CategoriesGroup component that displays a list of categories with checkboxes,
* a search bar for filtering categories, and a form for adding new categories.
*
* @return {JSX.Element} A CategoriesGroup component
* @example
* <CategoriesGroup />
* @typedef {Object} Category
* @property {number} id - The unique identifier for the category
* @property {string} name - The name of the category
* @property {number} parent_id - The ID of the parent category, or 0 if it has no parent
* @typedef {Object} Props
* @property {Category[]} categories - An array of Category objects
* @property {number[]} selected - An array of selected category IDs
* @property {function} onChange - A callback function triggered when a category checkbox is toggled
*/

const  CategoriesGroup=()=>{
  const [categories,selected] = useGetCategories();
  const [selectCategory,deselectCategory]=useSelectCategory();
  const [filterValue, setFilterValue, filteredCategories] = useCategoryFilter(categories);
  const [newCategoryParams, newCategoryNameInputHandler, newCategoryParentSelectHandler, addCategoryHandler,isCategoriesMutating] = useCreateCategory({ parent: 0, name: "" });
  const categorySelectHandler = useCallback((event, id) => {
    const checkedStatus = event.target.checked;
    if (checkedStatus === undefined) return null;
    if (checkedStatus) {
      selectCategory(id);
    } else {
      deselectCategory(id);
    }
  }, [dispatch]);

  return (
    <>
      <SidebarItem>
        <div className="input-container categories-search">
          <label htmlFor="categories-filter-input">Search Categories:</label>
          <input
            type="text"
            id="categories-filter-input"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
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
        expandButtonCallback={(onClick) => (
          <button onClick={onClick} className="pop-up-link">
            Add New Category
          </button>
        )}
      >
        <div className="sidebar-item-expandable-row">
          <label htmlFor="category-input">New Category Name</label>
          <input
            value={newCategoryParams.name}
            type="text"
            id="category-input"
            onChange={newCategoryNameInputHandler}
          ></input>
        </div>
        <div className="sidebar-item-expandable-row">
          <label htmlFor="parent-category-select">Parent Category</label>
          <br></br>
          <Select
            id="arent-category-select"
            onChange={newCategoryParentSelectHandler}
          >
            <option value={0}>— Parent Category —</option>
            <CategoiresOptionList id={0} categories={categories} />
          </Select>
        </div>
        <div className="sidebar-item-expandable-row">
          <button
            disabled={isCategoriesMutating }
            className="sidebar-submit-big-button"
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
