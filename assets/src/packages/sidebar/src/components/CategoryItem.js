import React, { useCallback } from 'react'
import '@news-parser/styles/sidebar/_category-item.scss';

export function CategoryItem (props){
    const onChange=useCallback((e)=>{
        props.onChange(props.id,e.targer.value)
    },[props.id])
    if (!Array.isArray(props.categories)) return [];
    return (
        <div className='category-item-container'>
            <input onChange={(e)=>{}} type='checkbox' id={`category-${props.categoryName}`}></input>
            <label for={`category-${props.categoryName}`}>{props.categoryName}</label>
             {props.categories.filter(item=>item.parent==props.id).map((item,index)=><CategoryItem categories={props.categories} key={index.toString()}id={item.id} categoryName={item.name} onChange={props.onChange}/>) }
        </div>
    )
}