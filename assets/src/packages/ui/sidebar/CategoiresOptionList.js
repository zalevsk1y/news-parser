import React from 'react';
import { CategoriesOptionItem } from './CategoriesOptionItem';


export function CategoiresOptionList(props) {
   const renderOptionList=(name,id,prefix)=>{
        const prefixCode='\u00A0';
        return (
            <React.Fragment key={id.toString()}>
            <CategoriesOptionItem id={id} name={name} prefix={prefixCode.repeat(prefix)}/>
                {  props.categories
                    .filter(item=>item.parent==id)
                    .map(item=>renderOptionList(item.name,item.id,prefix+1))
                    }
            </React.Fragment>
        )
   }
    return (
        <>
            {
                props.categories
                    .filter(item=>item.parent==props.id)
                    .map(item=>renderOptionList(item.name,item.id,0))
            }
        </>
    )
}