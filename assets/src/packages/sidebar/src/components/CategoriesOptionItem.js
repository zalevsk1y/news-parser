import React from 'react'

export function CategoriesOptionItem(props) {
    const prefix=props.prefix||'';
    return (
            <option value={props.id} >{prefix+props.name}</option>   
        )
}