import React from 'react';
import '../styles/SidebarItemLabel.css'

export interface SidebarItemLabelProps{
    children:React.ReactNode,
    className?:string,
    htmlFor:string
}

/**
 * SidebarItemLabel component represents a label for a form input element in a sidebar.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content of the label.
 * @param {string} [props.className] - Additional CSS class name for styling purposes.
 * @param {string} props.htmlFor - The ID of the associated form input element.
 * @returns {JSX.Element} The rendered SidebarItemLabel component.
 */


export const SidebarItemLabel:React.FC<SidebarItemLabelProps>=({children,className,htmlFor})=>(
        <div className={`sidebar-item-label ${className!==undefined?className:''}`}>
            <label htmlFor={htmlFor}>{children}</label>
        </div>
    )