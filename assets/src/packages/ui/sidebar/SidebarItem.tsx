import React from 'react';
import '../styles/SidebarItem';

export interface SidebarItemProps {
    children: React.ReactNode,
    border?: 'top' | 'bottom',
    wide?: boolean,
    isEmpty?: boolean
}

/**
 * A component for displaying content within a sidebar item.
 * 
 * @param {SidebarItemProps} props - The props for the component.
 * @param {string} props.border - The type of border to display around the sidebar item.
 * @param {boolean} [props.wide] - Whether the sidebar item should take up the full width of the sidebar.
 * @param {React.ReactNode} props.children - The child content to display within the sidebar item.
 * @param {boolean} [props.isEmpty] - Whether the sidebar item should be displayed as empty (with no content).
 * 
 * @returns {JSX.Element} The rendered SidebarItem component.
 */


export const SidebarItem: React.FC<SidebarItemProps> = ({ border, wide, children, isEmpty }) => {
    const borderClassName = border === 'top' || border === 'bottom' ? `sidebar-item-${border}-border` : `sidebar-item-no-border`;
        const wideOfItem = wide ? 'sidebar-item-wide' : 'sidebar-item-narrow';
        const className = `sidebar-item  ${borderClassName} ${wideOfItem}`;

    return (
        <div className={isEmpty ? 'empty' : className}>
            {children}
        </div>
    )
}