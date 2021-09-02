import React from 'react';
import { CategoryItem } from './CategoryItem';
import '@news-parser/styles/sidebar/_category-item.scss';

export function CategoriesCheckboxList (props){
        const renderCategoryItems=({name,id})=>{
                const selected=props.selected||[]
                const onChange=(event)=>props.onChange!==undefined?props.onChange(event,id):false
                return (
                    <CategoryItem onChange={onChange} checked={selected.includes(id)} name={name} id={id} key={id.toString()}>
                        {props.categories.filter(item=>item.parent==id).map(item=>renderCategoryItems(item)) }
                    </CategoryItem>
                );
            }
    if(!Array.isArray(props.categories)) return [];
    return (
            <div className='category-items-outer-container'>
                {props.categories.filter(item=>item.parent==props.id).map(item=>renderCategoryItems(item))}
            </div>
        )
    }