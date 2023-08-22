import React from 'react';
import '../styles/InfoBox';

export interface InfoBoxProps {
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

export const InfoBox: React.FC<InfoBoxProps> = ({ title, children }) => (
        <div id='postimagediv' className='postbox'>
            <div className='d-flex flex-row'>
                <h2 className='ui-sortable-handle infobox-header flex-grow-1'>
                    <span>{title}</span>
                </h2>
                <button type='button' className='handlediv' aria-expanded='true'>
                    <span className='screen-reader-text'>{`Toggle panel:${  title}`}</span>
                    <span className='toggle-indicator' aria-hidden='true' />
                </button>
            </div>
            {children}
        </div>
    )

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