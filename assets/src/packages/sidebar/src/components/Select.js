import React, { useCallback,useState } from 'react';
import '@news-parser/styles/sidebar/_select.scss';

export function Select ({onChange,children,value}){
    const onChangeCallback=useCallback((e)=>{
        onChange(e)
    })

    return (
        <select onChange={onChangeCallback} value={value}>
            {children}
        </select>
    )
}