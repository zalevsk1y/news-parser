import React, { useCallback } from 'react';
import './tag.scss';

export function Tag ({children,closeTag}){
    const closeTagWithName=useCallback(()=>closeTag(children),[closeTag,children]);
    return (
        <li className="filter-tag" data-filter-name={children}>
            {children.length>10?children.slice(0,10).concat('...'):children} 
            <i className="fo-icon fo-close" onClick={closeTagWithName}></i>
        </li>
    )
}

