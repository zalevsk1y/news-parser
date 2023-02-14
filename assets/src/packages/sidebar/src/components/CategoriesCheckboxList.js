import React from "react";
import { CategoryItem } from "./CategoryItem";
import "@news-parser/styles/sidebar/_category-item.scss";

export function CategoriesCheckboxList({
  categories,
  selected = [],
  onChange,
  id,
}) {
  const renderCategoryItems = ({ name, id }) => {
    const onChangeHandler = (event) => (onChange ? onChange(event, id) : false);
    return (
      <CategoryItem
        onChange={onChangeHandler}
        checked={selected.includes(id)}
        name={name}
        id={id}
        key={id.toString()}
      >
        {categories
          .filter((item) => item.parent == id)
          .map((item) => renderCategoryItems(item))}
      </CategoryItem>
    );
  };
  if (!Array.isArray(categories) || categories.length === 0) return null;
  return (
    <div className="category-items-outer-container">
      {categories
        .filter((item) => item.parent == id)
        .map((item) => renderCategoryItems(item))}
    </div>
  );
}
