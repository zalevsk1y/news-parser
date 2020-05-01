import React, { FormEvent, useMemo } from 'react';
import { CategoryItem } from '@news-parser/ui/sidebar/CategoryItem';
import { Category } from 'types/sidebar';
import '../../../styles/CategoriesCheckboxList';

interface CategoriesCheckboxListProps {
  categories: Array<Category>,
  selected: Array<number> | [],
  onChange: (e: FormEvent<HTMLInputElement>, id: number) => void
  id?: number
}

/**
 * React functional component for rendering a list of categories as checkboxes.
 *
 * @component
 * @param {CategoriesCheckboxListProps} props - The component props.
 * @param {Array<Category>} props.categories - The array of categories.
 * @param {Array<number>} [props.selected=[]] - The array of selected category IDs.
 * @param {Function} props.onChange - The onChange event handler function.
 * @param {number} props.id - The ID of the parent category.
 * @returns {JSX.Element|null} The rendered component or null if categories array is empty.
 */
export const CategoriesCheckboxList: React.FC<CategoriesCheckboxListProps> = ({ categories, selected = [], onChange, id }) => {
  if (!Array.isArray(categories) || categories.length === 0) return null;
  const categoriesItems = useMemo(() => {
    const renderCategoryItems = (cateogryObject: Category) => {
      const { name, id } = cateogryObject;
      const onChangeHandler = (event: FormEvent<HTMLInputElement>) => (onChange ? onChange(event, id!==undefined?id:0) : false);
      return (
        <CategoryItem
          onChange={onChangeHandler}
          checked={id !== undefined && selected.includes(id)}
          name={name}
          key={name}
        >
          {categories
            .filter((item) => item.parent == id)
            .map((item) => renderCategoryItems(item))}
        </CategoryItem>
      );
    };
    return categories
      .filter((item) => item.parent == id)
      .map((item) => renderCategoryItems(item))
  }, [categories, selected, onChange, id])
  return (
    <div className='category-items-outer-container'>
      {
        categoriesItems
      }
    </div>
  );
}
