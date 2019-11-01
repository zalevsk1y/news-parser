import React from 'react';

export function Button({children,onClick}){
    return (
        <button type="button" className="button button-primary button-large"  onclick={onClick}>{children}</button>
    )
}