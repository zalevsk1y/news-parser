import React, { useState, useMemo, useEffect } from "react";



/**
* A functional component that displays the right sidebar of the Parsing Constructor modal window.
* The component manages the state of the sidebar by initializing the activeTab state with a default value of "Template",
* and using the setActiveTab function to update the activeTab state when the user clicks on a different tab.
* The component uses useMemo to compute the tabNames array, which contains the names of the tabs to be displayed on the sidebar.
* The component also renders the tabs based on the activeTab state, using the tabs object to map the tab name to a component.
* 
* @since 1.0.0
* @returns {JSX.Element} The JSX element for the right sidebar of the Parsing Constructor modal window.
*
*/

export const SidebarRight = ({ tabs, children }) => {
  const [activeTab, setActiveTab] = useState(0);
  const activeTabChangeHandler = (tabIndex) => () => setActiveTab(tabIndex);
  const tabNames = useMemo(() => (tabs.map((tab, index) => (
      <a
        key={tab}
        className={`nav-link ${activeTab === index ? "active" : ""}`}
        onClick={activeTabChangeHandler(index)}
      >
        {tab}
      </a>))), [activeTab]);
  return (
    <div className="modal-right-side-bar d-flex flex-column" >
      <div className="sidebar-nav">
        <nav className="nav">
          {tabNames}
        </nav>
      </div>
      {children[activeTab]}
    </div>
  );
};

