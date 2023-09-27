import React from 'react';
import '../styles/CategoryItem.css';

export interface CategoryItemProps {
    name: string,
    checked: boolean,
    onChange: React.FormEventHandler<HTMLInputElement>,
    children?: React.ReactNode
}
/** 
 * A component that represents a category item with a checkbox and a label.
 *
 * @param {CategoryItemProps} props - The props for the component.
 * @param {string} name - The name of the category.
 * @param {boolean} checked - Whether the category is checked or not.
 * @param {function} onChange - A callback function that will be called when the checkbox value changes.
 * @param {React.ReactNode} [children] - Optional child nodes to render below the label.
 * @returns {JSX.Element} A div element containing a checkbox and a label.
 */

export const CategoryItem: React.FC<CategoryItemProps> = ({ name, onChange, children, checked }) => (
        <div className='category-item-container'>
            <input onChange={onChange} type='checkbox' id={`category-${name}`} checked={checked} />
            <label htmlFor={`category-${name}`}>{name}</label>
            {children}
        </div>
    )