import React from "react";

export const PostCard = ({ status, children }) => {
    return (
        <div className={"post-container " + ((status === "draft" || status === "selected") ? "highlight" : "")}>
            {children}
        </div>
    )
}