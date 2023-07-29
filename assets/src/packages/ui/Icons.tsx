import React from 'react';

export interface IconsProps {
    className: string,
    title: string,
    onClick: React.EventHandler<React.MouseEvent<HTMLElement>>
}
/**
 * Creates icon and set click handler callback.
 * 
 * @since 0.8.0
 * @param {string} className Icon class name.
 * @param {string} title Icon title.
 * @param {function} onClick Function click handler.  
 */
export const Icons: React.FC<IconsProps> = ({ className, title, onClick }) => {
    return (
        <span className={className} title={title} onClick={onClick}></span>
    )
} 
