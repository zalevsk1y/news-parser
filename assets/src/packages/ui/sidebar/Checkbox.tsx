import React from 'react';

export interface CheckboxProps {
    checked:boolean,
    onChange:React.ChangeEventHandler<HTMLInputElement>
}

 export const Checkbox:React.FC<CheckboxProps>= ({checked,onChange})=>(
        <input type='checkbox' checked={checked} onChange={onChange}  />
    )

