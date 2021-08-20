import React from 'react'

export function CategoriesOptionItem(props) {
    const prefix=props.prefix||'';
    return (
        <>
                <option value={props.id} >{prefix+props.categoryName}</option>
                {  
                    props.categories
                        .filter(item=>item.parent==props.id)
                        .map((item,index)=><CategoriesOptionItem key={index.toString()} id={item.id} categoryName={item.name} categories={props.categories} prefix={prefix+'\u00A0'}/>)
                }
        </>
        )
}