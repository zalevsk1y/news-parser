import React, { useState } from 'react';
//import '@news-parser/styles/sidebar/_item-expandable.scss';


export function SidebarItemExpandable ({expandButtonCallback,children,wide}){
    const [state,setState]=useState({itemOpen:false}),
    wideOfItem=wide?'sidebar-item-expandable-wide':'sidebar-item-expandable-narrow'
    return (
        <div className={`sidebar-item-expandable ${wideOfItem}`}>
            {expandButtonCallback(()=>setState({itemOpen:!state.itemOpen}))}
            <div className={`sidebar-item-expandable-area sidebar-item-expandable-area-${state.itemOpen?'open':'close'}`} >
                {children}
            </div>
        </div>
    )
}