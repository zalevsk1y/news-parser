import React from 'react';
// import '../styles/TabsBody.css'

export type TabsProps ={
    children: Array<React.ReactElement>,
    className?: string,
    activeTab: number,
}

export const TabsBody: React.FC<TabsProps> = ({ children, className, activeTab }) => (
        <div 
            className={`autopilot-tabs-container bg-white pt-3 pb-3 ps-5 pe-5 ${className ?? ''}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
        >
            {children[activeTab]}
        </div>
    )