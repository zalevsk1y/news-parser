import React from 'react';
import './styles/HiddenBlock.css'

export interface HiddenBlockProps {
    hide: boolean;
    children: React.ReactNode,
    className?:string
}

/**
* A component for rendering a block that can be hidden.
* 
* @param {HiddenBlockProps} props - The props for the component.
* @param {boolean} props.hide - Whether the block should be hidden.
* @param {React.ReactNode} props.children - The child content to display within the block.
* 
* @returns {JSX.Element} The rendered HiddenBlock component.
*/


export const HiddenBlock: React.FC<HiddenBlockProps> = ({ hide, className,children }) => (
        <div hidden={hide} className={className}>
            {children}
        </div>
    )