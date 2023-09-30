import React, { Children } from 'react';
import '../styles/InfoBox.css';

export type InfoBoxProps= {
    title: string,
    children: React.ReactNode
}

/**
 * A component for displaying information in a styled box.
 * 
 * @param {InfoBoxProps} props - The props for the component.
 * @param {string} props.title - The title of the info box.
 * @param {React.ReactNode} props.children - The child content to display within the info box.
 * 
 * @returns {JSX.Element} The rendered InfoBox component.
 */

export const InfoBox: React.FC<InfoBoxProps> = ({ title, children }) => {
    if(Children.toArray(children).length==0) return null;
    return(
            <div className='postbox'>
                <div className='d-flex flex-row'>
                    <h2 className='ui-sortable-handle infobox-header flex-grow-1'>
                        <span>{title}</span>
                    </h2>
                </div>
                {children}
            </div>
    )
} 

export interface InfoHeaderProps {
    children: React.ReactNode
}

export const InfoBody:React.FC<InfoHeaderProps>=({ children })=> (
        <div className='inside'>
            {children}
        </div>
    )

export interface InfoFooterProps {
    children: React.ReactNode
}
export const InfoFooter:React.FC<InfoFooterProps>=({ children })=> (
        <div className='infobox-footer'>
            {children}
        </div>
    )