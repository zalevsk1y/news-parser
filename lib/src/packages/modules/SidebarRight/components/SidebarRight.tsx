import React, { useState, useMemo } from 'react';

interface SidebarRightProps{
  tabs:Array<string>,
  children:Array<React.ReactElement>
}


/**
* A functional component that displays the right sidebar of the Parsing Constructor modal window.
* The component manages the state of the sidebar by initializing the activeTab state with a default value of 'Template',
* and using the setActiveTab function to update the activeTab state when the user clicks on a different tab.
* The component uses useMemo to compute the tabNames array, which contains the names of the tabs to be displayed on the sidebar.
* The component also renders the tabs based on the activeTab state, using the tabs object to map the tab name to a component.
* 
* @since 1.0.0
* @returns {JSX.Element} The JSX element for the right sidebar of the Parsing Constructor modal window.
*
*/

export const SidebarRight:React.FC<SidebarRightProps> = ({ tabs, children }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const activeTabChangeHandler = (tabIndex:number) => () => setActiveTab(tabIndex);
  const tabNames = useMemo(() => (tabs.map((tab, index) => (
      <a
        key={tab}
        className={`nav-link flex-grow-1 text-center np-fs-16  ${activeTab === index ? 'active' : ''}`}
        onClick={activeTabChangeHandler(index)}
        role='tab'
        tabIndex={0}
        aria-selected={activeTab==index}
      >
        {tab}
      </a>))), [activeTab,tabs]);
    const activeTabElement=useMemo(()=>Array.isArray(children)&&React.isValidElement(children[activeTab])?children[activeTab]:null,[children,activeTab])
  return (
    <div className='modal-right-side-bar d-flex flex-column' >
      <div className='sidebar-nav'>
        <nav className='nav d-flex flex-row w-100' role='tab-list'>
          {tabNames}
        </nav>
      </div>
      {activeTabElement}
    </div>
  );
};

