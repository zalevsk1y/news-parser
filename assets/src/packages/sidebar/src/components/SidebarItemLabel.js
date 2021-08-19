import React from 'react';
import '@news-parser/styles/sidebar/_item-label.scss';

export function SidebarItemLabel({children,className}){
    return (
        <div className={`sidebar-item-label ${className!==undefined?className:''}`}>
            {children}
        </div>
    )
}