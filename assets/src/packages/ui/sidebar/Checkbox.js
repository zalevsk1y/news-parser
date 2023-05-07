import React from 'react';

/**
 * Check box element
 * 
 * @since 1.0.0
 * @param {object} props 
 */
 export function Checkbox ({value,onClick}){
    return (
        <input type="checkbox" value={!(!value)} onClick={onClick} ></input>
    )
}

