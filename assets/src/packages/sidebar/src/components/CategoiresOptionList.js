import React from 'react';
import { CategoriesOptionItem } from './CategoriesOptionItem';


export function CategoiresOptionList(props) {
   
    return (
        <>
            {
                props.categories
                    .filter(item=>item.parent==props.id)
                    .map((item,index)=><CategoriesOptionItem key={index.toString()} id={item.id} categoryName={item.name} categories={props.categories} />)
            }
        </>
    )
}