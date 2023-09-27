import React, { useState, useCallback } from 'react';
import '../styles/SidebarItemExpandable.css'

export interface SidebarItemExpandableProps {
    expandButton: {value:string,className:string},
    children: React.ReactNode,
    wide?: boolean
}

/**
 * A component for displaying an expandable sidebar item.
 * 
 * @param {SidebarItemExpandableProps} props - The props for the component.
 * @param {{value:string,className:string}} props.expandButton - A callback function to display the expand button for the sidebar item.
 * @param {React.ReactNode} props.children - The child content to display within the sidebar item.
 * @param {boolean} [props.wide] - Whether the sidebar item should take up the full width of the sidebar.
 * 
 * @returns {JSX.Element} The rendered SidebarItemExpandable component.
 */


export const SidebarItemExpandable: React.FC<SidebarItemExpandableProps> = ({ expandButton, children, wide }) => {
    const [state, setState] = useState<{itemOpen:boolean}>({ itemOpen: false });
    const wideOfItem = wide ? 'sidebar-item-expandable-wide' : 'sidebar-item-expandable-narrow';
    const expandButtonHandler=useCallback(() => setState({ itemOpen: !state.itemOpen }),[state])
    return (
        <div className={`sidebar-item-expandable ${wideOfItem}`}>
        <button
          onClick={expandButtonHandler}
          className={expandButton.className}
          aria-expanded={state.itemOpen}
          aria-controls='sidebar-item-expandable-area'
        >
          {expandButton.value}
        </button>
        <div
          hidden={!state.itemOpen}
          data-testid='sidebar-item-expandable-area'  
          role='group'
          id='sidebar-item-expandable-area'
          className='sidebar-item-expandable-area'
          aria-hidden={!state.itemOpen}
        >
          {children}
        </div>
      </div>
  
    )
}