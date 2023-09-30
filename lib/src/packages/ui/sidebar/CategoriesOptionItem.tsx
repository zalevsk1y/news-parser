import React from 'react'

export type CategoriesOptionItemProps= {
    name: string,
    id?: string | number
}

export const CategoriesOptionItem:React.FC<CategoriesOptionItemProps> = ({ name, id }) => (
        <option value={id} >{name}</option>
    )