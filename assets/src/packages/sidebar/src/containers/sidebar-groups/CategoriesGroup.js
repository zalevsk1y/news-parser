import React, { useCallback, useEffect } from "react";
import { CategoriesCheckboxList } from "../../components/CategoriesCheckboxList";
import { CategoiresOptionList } from "../../components/CategoiresOptionList";
import { Select } from "../../components/Select";
import { SidebarItem } from "../../components/SidebarItem";
import { SidebarItemsGroup } from "../../components/SidebarItemsGroup";
import { SidebarItemExpandable } from "../../components/SidebarItemExpandable";
import {
  createCategory,
  selectCategory,
  diselectCategory,
} from "../../actions/category.actions";
import { useDispatch, useSelector } from "react-redux";

import { useCategoryFilter } from "../../hooks/useCategoryFilter";
import { useNewCategory } from "../../hooks/useNewCategory";
import "@news-parser/styles/sidebar/_input-container.scss";
import "@news-parser/styles/sidebar/_categories-group.scss";


import { useGetCategories } from "@news-parser/sidebar/hooks/useGetCategories";



function CategoriesGroup() {
  const categories = useSelector((state) => state.parse.sidebar.categories);
  const selected = useSelector((state) => state.parse.sidebar.selectedCategories);
  const dispatch=useDispatch()
  const [isCategoriesFetching, startCategoriesFetching] = useGetCategories();
  useEffect(() => {
    startCategoriesFetching();
  }, [])
  const [filterValue, setFilterValue, filteredCategories] = useCategoryFilter(categories);
  const [newCategoryParams, newCategoryNameInputHandler, newCategoryParentSelectHandler, addCategory] = useNewCategory({ parent: 0, name: "" });
  const addCategoryHandler = useCallback(() => {
    addCategory().then(() => startCategoriesFetching())
  })
  const categorySelectHandler = useCallback((event, id) => {
    const checkedStatus = event.target.checked;
    if (checkedStatus === undefined) return null;
    if (checkedStatus) {
      dispatch(selectCategory(id));
    } else {
      dispatch(diselectCategory(id));
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
            type="text"
            id="category-input"
            onBlur={newCategoryNameInputHandler}
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
