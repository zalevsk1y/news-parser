import React, { useCallback, useState } from 'react';
import { SidebarItem } from '../../ui/sidebar/SidebarItem';
import { SidebarItemLabel } from '../../ui/sidebar/SidebarItemLabel';
import '../styles/SidebarItemsGroup.scss';

export interface SidebarItemsGroupProps {
    border?: 'top' | 'bottom';
    header?: string;
    children?: React.ReactNode;
}

/**
 * A component that groups a set of `SidebarItem` components together, with an optional header and a collapsible state.
 *
 * @param {SidebarItemsGroupProps} props - The component props.
 * @param {string} border - The border style of the group. Can be 'top', 'bottom', or 'none'.
 * @param {string} header - The text to display as the group header.
 * @param {ReactNode} children - The child components to render in the group.
 * @returns {JSX.Element} A div element containing the `SidebarItem` components and a header with a collapsible state.
 */


export const SidebarItemsGroup: React.FC<SidebarItemsGroupProps> = ({ border, header, children }) => {
    const [state, setState] = useState(true);
        const onClick = useCallback(() => setState(!state), [state]);
        const borderClassName = border === 'top' || border === 'bottom' ? `sidebar-item-${border}-border` : `sidebar-item-no-border`;
    return (
        <div className={`sidebar-items-group ${borderClassName} ${state === false ? ' sidebar-items-group-closed sidebar-item-' : ''}`}>
            {header && <SidebarItem wide>
                <SidebarItemLabel>{header}</SidebarItemLabel>
                <span className={`check-switch check-switch-${  state ? 'on' : 'off'}`} onClick={onClick}>^</span>
            </SidebarItem>}
            {children}
        </div>
    )
}