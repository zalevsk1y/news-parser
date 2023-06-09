import React from 'react';

/**
 * Check box element
 * 
 * @since 1.0.0
 * @param {object} props 
 */
 export const Checkbox= ({checked,onChange})=>{
    return (
        <input type="checkbox" checked={checked} onChange={onChange} ></input>
    )
}

