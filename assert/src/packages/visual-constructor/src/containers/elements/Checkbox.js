import React from 'react';

 export function Checkbox ({value,onClick}){
    return (
        <input type="checkbox" value={!(!value)} onClick={onClick} ></input>
    )
}