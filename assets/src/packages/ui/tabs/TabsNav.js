import React,{ useMemo } from "react"

export const TabsNav = ({ className, tabs, onChange, activeTab }) => {
    console.log(activeTab,tabs);
    const tabElements = useMemo(() => tabs.map((tab, index) => (
        <li class="nav-item mb-0" key={index.toString()}>
            <a className={`nav-link ${activeTab == index?'active':''}`} href="#" onClick={() => index !== activeTab && onChange(index)}>{tab}</a>
        </li>
    )), [tabs, onChange, activeTab])
    return (
        <ul className={`nav nav-tabs ${className ?? ''}`}>
            {tabElements}
        </ul>
    )
}