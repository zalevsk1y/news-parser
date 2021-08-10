import React from 'react';
import '@news-parser/styles/sidebar/_select.scss';

export function Select ({onChange,children}){
    return (
        <select onChange={onChange}>
            {children}
        </select>
    )
}