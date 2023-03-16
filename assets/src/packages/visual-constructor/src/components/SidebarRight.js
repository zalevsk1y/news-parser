import React, { useState, useMemo } from "react";

import SidebarRightTemplate from "./sidebar-groups/SidebarRightTemplate";
import SidebarRightPost from "./sidebar-groups/SidebarRightPost";


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

const SidebarRight = () => {

  const [activeTab, setActiveTab] = useState("Template"),
    activeTabChangeHandler = (tabName) => () => setActiveTab(tabName),
    tabs = {
      'Template': () => (<SidebarRightTemplate />),
      'Post': () => (<SidebarRightPost />)
    },
    tabNames = useMemo(() => Object.keys(tabs), []);
  return (
    <div className="modal-right-side-bar d-flex flex-column">
      <div className="sidebar-nav">
        <nav className="nav">
          {tabNames.map((tab) => (
            <a
              key={tab}
              className={`nav-link ${activeTab === tab ? "active" : ""}`}
              onClick={activeTabChangeHandler(tab)}
            >
              {tab}
            </a>
          ))}
        </nav>
      </div>
      {tabs[activeTab]()}
    </div>
  );
};

export default SidebarRight;
