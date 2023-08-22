import React from 'react';
// import '@news-parser/styles/sidebar/_item-label.scss';
import '../styles/SidebarItemLabel'

export interface SidebarItemLabelProps{
    children:React.ReactNode,
    className?:string
}

export const SidebarItemLabel:React.FC<SidebarItemLabelProps>=({children,className})=>(
        <div className={`sidebar-item-label ${className!==undefined?className:''}`}>
            {children}
        </div>
    )