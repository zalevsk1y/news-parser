import React, { useCallback ,useState} from 'react';
import { SidebarItem } from './SidebarItem';
import { SidebarItemLabel } from './SidebarItemLabel';

export function SidebarItemsGroup ({border,header,children}){
    const [state,setState]=useState(true),
        onClick=useCallback(()=>setState(!state),[state]),
        borderClassName=border==='top'||border==='bottom'?`sidebar-item-${border}-border`:`sidebar-item-no-border`;
    return (
        <div className={`sidebar-items-group ${borderClassName} ${state===false?' sidebar-items-group-closed sidebar-item-':''}`}>
           <SidebarItem wide={true}>
                <SidebarItemLabel>{header}</SidebarItemLabel>
                <span className={'check-switch check-switch-'+(state?'on':'off')} onClick={onClick}>^</span>
            </SidebarItem>
            {children}
        </div>
    )
}