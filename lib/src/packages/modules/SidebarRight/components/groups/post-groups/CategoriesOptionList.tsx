import React, { useMemo } from 'react';
import { CategoriesOptionItem } from '@news-parser/ui/sidebar/CategoriesOptionItem';
import { Category } from 'types/sidebar';

interface CategoriesOptionListProps {
    categories: Array<Category>;
    id: number;
}

/**
 * React functional component for rendering a list of categories as options.
 *
 * @component
 * @param {CategoriesOptionListProps} props - The component props.
 * @param {Array<Category>} props.categories - The array of categories.
 * @param {number} props.id - The ID of the parent category.
 * @returns {JSX.Element} The rendered component.
 */

export const CategoriesOptionList: React.FC<CategoriesOptionListProps> = ({ categories, id }) => {
    const categoriesItems = useMemo(() => {
        const renderOptionList = (name: string, prefix: number, id?: number) => {
            const prefixCode = '\u00A0';
            console.log(id,name,prefix)
            return (
                <React.Fragment key={name}>
                    <CategoriesOptionItem id={id} name={`${prefixCode.repeat(prefix)}  ${name}`} />
                    {categories
                        .filter(item => item.parent == id)
                        .map(item => renderOptionList(item.name, prefix + 1, item.id))
                    }
                </React.Fragment>
            )
        }
        return categories
            .filter(item => item.parent == id)
            .map(item => renderOptionList(item.name, 0, item.id))
    }, [categories, id])
    return (
        <>
            {
                categoriesItems
            }
        </>
    )
}