import React from 'react';

export function SidebarHeader(props){
    return (
        <div className='sidebar-header'>
            {props.children}
        </div>
    );
}