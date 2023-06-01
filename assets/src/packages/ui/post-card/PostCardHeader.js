import React from "react";

export const PostCardHeader = ({ pubDate }) => {
    return (
        <div className="post-time">
            <span className="fo fo-clock"></span>
            <span className="post-time-header">{pubDate}</span>
        </div>
    )
}