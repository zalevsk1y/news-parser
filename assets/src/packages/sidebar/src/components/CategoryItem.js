import React, { useCallback } from 'react'
import '@news-parser/styles/sidebar/_category-item.scss';

export function CategoryItem (props){
    const onChange=useCallback((e)=>{
        props.onChange(e,props.id)
    },[props.id])
    return (
        <div className='category-item-container'>
            <input onChange={onChange} type='checkbox' id={`category-${props.name}`} checked={props.checked}></input>
            <label htmlFor={`category-${props.name}`}>{props.name}</label>
             {props.children}
        </div>
    )
}