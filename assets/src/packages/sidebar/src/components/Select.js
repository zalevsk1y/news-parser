import React, { useCallback,useState } from 'react';
import '@news-parser/styles/sidebar/_select.scss';

export function Select ({onStateChange,children,value}){
    const onChangeCallback=useCallback((e)=>{
        const selectedValue=e.target.value
        setState({value:selectedValue})
        onStateChange(selectedValue)
    })
    const [state,setState]=useState(()=>{
        return {value}
    })
    return (
        <select onChange={onChangeCallback} value={state.value}>
            {children}
        </select>
    )
}