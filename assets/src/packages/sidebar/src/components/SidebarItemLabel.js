import React from 'react';

export function SidebarItemLabel({children,className}){
    return (
        <div className={className+' sidebar-item-label'}>
            {children}
        </div>
    )
}