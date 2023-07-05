import React, { useCallback, useState } from "react";
import { TabsNav } from "../ui/tabs/TabsNav";
import { TabsBody } from "../ui/tabs/TabsBody";

export const Tabs=({tabs,children})=>{
    const [activeTab,setActiveTab]=useState(0);
    const changeActiveTabHandler=useCallback(activeTabIndex=>setActiveTab(activeTabIndex),[setActiveTab]);
    return(
        <>
            <TabsNav tabs={tabs} activeTab={activeTab} onChange={changeActiveTabHandler} className='autopilot-nav-tab'/>
            <TabsBody activeTab={activeTab}>
                {children}
            </TabsBody>
        </>
    );
}