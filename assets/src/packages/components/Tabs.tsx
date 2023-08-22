import React, { useCallback, useState } from "react";
import { TabsNav } from "./tabs/TabsNav";
import { TabsBody } from "../ui/tabs/TabsBody";

export interface TabsProps{
    tabs:string[],
    children:Array<React.ReactElement>
}

/**
 * A component that displays a set of tabs with associated content, and allows for a callback function to be called when the active tab changes.
 *
 * @param {TabsProps} props - The component props.
 * @param {string[]} tabs - An array of strings representing the titles of the tabs.
 * @param {ReactNode} children - The child components to render as content associated with the tabs.
 * @returns {JSX.Element} A div element containing tab navigation and content.
 */


export const Tabs:React.FC<TabsProps>=({tabs,children})=>{
    const [activeTab,setActiveTab]=useState(0);
    const changeActiveTabHandler=useCallback((activeTabIndex:number)=>setActiveTab(activeTabIndex),[setActiveTab]);
    return(
        <>
            <TabsNav tabs={tabs} activeTab={activeTab} onChange={changeActiveTabHandler} className='autopilot-nav-tab'/>
            <TabsBody activeTab={activeTab}>
                {children}
            </TabsBody>
        </>
    );
}