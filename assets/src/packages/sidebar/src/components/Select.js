import React from 'react';

export function Select ({onChange,children}){
    return (
        <select onChange={onChange}>
            {children}
        </select>
    )
}