import React, { useMemo } from 'react'

export interface TabsNavProps {
    className?: string,
    tabs: string[],
    onChange: (index: number) => void,
    activeTab: number
}

export const TabsNav: React.FC<TabsNavProps> = ({ className, tabs, onChange, activeTab }) => {
    const tabElements = useMemo(() => tabs.map((tab, index) => (
      <li
        className="nav-item mb-0"
        key={index.toString()}
        role="presentation"
      >
        <button
          className={`nav-link ${activeTab === index ? 'active' : ''}`}
          onClick={() => index !== activeTab && onChange(index)}
          aria-selected={activeTab === index ? 'true' : 'false'}
        >
          {tab}
        </button>
      </li>
    )), [tabs, onChange, activeTab]);
  
    return (
      <ul
        className={`nav nav-tabs ${className ?? ''}`}
        role="tablist"
      >
        {tabElements}
      </ul>
    );
  };
  