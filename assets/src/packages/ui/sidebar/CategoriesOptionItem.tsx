import React from 'react'

export interface CategoriesOptionItemProps {
    prefix?: string,
    name: string,
    id?: string | number
}

export const CategoriesOptionItem:React.FC<CategoriesOptionItemProps> = ({ prefix, name, id }) => (
        <option value={id} >{prefix ?? `${  name}`}</option>
    )