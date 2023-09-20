import React from 'react';

type CheckboxPropsType = React.HTMLProps<HTMLInputElement>

export const Checkbox: React.FC<CheckboxPropsType> = ({ checked, onChange, id }) => {
    if (checked === undefined) return null;
    return (
        <input type='checkbox' checked={checked} id={id} onChange={onChange} />
    )
}

