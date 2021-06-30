import React, { useCallback ,useState} from 'react';
import { SidebarItem } from './SidebarItem';
import { SidebarItemLabel } from './SidebarItemLabel';

export function SidebarItemsGroup ({header,children}){
    const [state,setState]=useState(true),
        onClick=useCallback(()=>setState(!state),[state])
    return (
        <div className='sidebar-items-group sidebar-item-wide'>
           <SidebarItem wide={true} border={false}>
                <SidebarItemLabel>{header}</SidebarItemLabel>
                <span className={'check-switch check-switch-'+state?'on':'off'} onClick={onClick}>^</span>
            </SidebarItem>
            {children}
        </div>
    )
}