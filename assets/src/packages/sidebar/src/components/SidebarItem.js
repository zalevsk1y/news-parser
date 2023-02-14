import React from 'react';
import '@news-parser/styles/sidebar/_item.scss';

export function SidebarItem ({border,wide,children,isEmpty}){
    const borderClassName=border==='top'||border==='bottom'?`sidebar-item-${border}-border`:`sidebar-item-no-border`,
        wideOfItem=wide?'sidebar-item-wide':'sidebar-item-narrow',
        className=`sidebar-item  ${borderClassName} ${wideOfItem}`;

    return (
        <div className={isEmpty?'empty':className}>
            {children}
        </div>
    )
}