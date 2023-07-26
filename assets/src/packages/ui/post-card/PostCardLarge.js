import React from "react";

export const PostCartLarge=({ children, className })=>{
    return (
        <div className={`autopilot-tabs-container bg-white pt-3 pb-3 px-3 ${className??''}`}>
            {children}
        </div>
    )
}