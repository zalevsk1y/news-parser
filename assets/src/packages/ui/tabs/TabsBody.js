import React from "react";

export const TabsBody = ({ children, className, activeTab }) => {
    return (
        <div className={`autopilot-tabs-container bg-white pt-3 pb-3 ps-5 pe-5 ${className??''}`}>
            {children[activeTab]}
        </div>
    )
}