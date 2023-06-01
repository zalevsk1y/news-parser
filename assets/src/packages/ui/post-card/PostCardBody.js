import React from "react";

export const PostCardBody = ({ link, title, description }) => {
    return (
        <div className="post-content">
            <div className="post-title-wrapper">
                <a
                    className="title-post-link"
                    href={link}>
                    <span className="post-title">{title}</span>
                </a>
            </div>
            <div className="post-description">
                <span>{description}</span>
            </div>
        </div>
    )
}