import React from 'react';

export function SidebarItem ({border,wide,children}){
    const borderClassName=border==='top'||border==='bottom'?`sidebar-item-${border}-border`:`sidebar-item-no-border`,
        wideOfItem=wide?'sidebar-item-wide':'sidebar-item-narrow';
    return (
        <div className={'sidebar-item '+borderClassName+' '+wideOfItem}>
            {children}
        </div>
    )
}