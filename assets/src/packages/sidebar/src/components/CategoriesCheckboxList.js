import React from 'react';
import { CategoryItem } from './CategoryItem';
import '@news-parser/styles/sidebar/_category-item.scss';

export function CategoriesCheckboxList (props){
    if(!Array.isArray(props.categories)) return [];
    return (
            <div className='category-items-outer-container'>
            {props.categories.filter(item=>item.parent==props.id).map((item,index)=>{
            return <CategoryItem key={index.toString()} id={item.id} categories={props.categories} categoryName={item.name} />
            })}
            </div>
        )
    }