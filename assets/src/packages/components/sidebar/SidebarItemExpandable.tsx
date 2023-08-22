import React, { useState,useMemo } from 'react';
import '../styles/SidebarItemExpandable'

export interface SidebarItemExpandableProps {
    expandButton: (toggleCallback:()=>void) => React.ReactElement,
    children: React.ReactNode,
    wide?: boolean
}

/**
 * A component for displaying an expandable sidebar item.
 * 
 * @param {SidebarItemExpandableProps} props - The props for the component.
 * @param {(toggleCallback: () => void) => React.ReactNode} props.expandButtonCallback - A callback function to display the expand button for the sidebar item.
 * @param {React.ReactNode} props.children - The child content to display within the sidebar item.
 * @param {boolean} [props.wide] - Whether the sidebar item should take up the full width of the sidebar.
 * 
 * @returns {JSX.Element} The rendered SidebarItemExpandable component.
 */


export const SidebarItemExpandable: React.FC<SidebarItemExpandableProps> = ({ expandButton, children, wide }) => {
    const [state, setState] = useState<{itemOpen:boolean}>({ itemOpen: false });
    const wideOfItem = wide ? 'sidebar-item-expandable-wide' : 'sidebar-item-expandable-narrow';
    const expandButtonElement=useMemo(()=>expandButton(() => setState({ itemOpen: !state.itemOpen })),[state,expandButton])
    return (
        <div className={`sidebar-item-expandable ${wideOfItem}`}>
            {expandButtonElement}
            <div className={`sidebar-item-expandable-area sidebar-item-expandable-area-${state.itemOpen ? 'open' : 'close'}`} >
                {children}
            </div>
        </div>
    )
}