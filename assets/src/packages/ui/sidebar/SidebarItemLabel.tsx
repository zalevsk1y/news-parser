import React from 'react';
import '../styles/SidebarItemLabel.css'

export interface SidebarItemLabelProps{
    children:React.ReactNode,
    className?:string
}

export const SidebarItemLabel:React.FC<SidebarItemLabelProps>=({children,className})=>(
        <div className={`sidebar-item-label ${className!==undefined?className:''}`}>
            {children}
        </div>
    )