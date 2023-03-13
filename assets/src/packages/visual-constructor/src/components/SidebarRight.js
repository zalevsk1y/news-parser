import React, { useState, useMemo, useEffect } from "react";

import SidebarRightTemplate from "./sidebar-groups/SidebarRightTemplate";
import SidebarRightPost from "./sidebar-groups/SidebarRightPost";

/**
 * Right side bar of visual constructor modal window.
 *
 * @since 1.0.0
 */

const SidebarRight = () => {
  useEffect(()=>{
    useSetCategories();
    useSetTags();
  },[])
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
