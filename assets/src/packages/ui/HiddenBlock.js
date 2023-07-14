import React from 'react';

export const HiddenBlock=({children,hide})=>{
    return (
        <div className={hide ? "hidden-height" : ""}>
            {children}
        </div>
    )
}