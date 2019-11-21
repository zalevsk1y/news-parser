import React from 'react';

export default function Icons ({className,title,onClick}){
    return (
        <span className={className} title={title} onClick={onClick}></span>
    )
} 