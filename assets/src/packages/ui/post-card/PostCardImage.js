import React from "react";

export const PostCardImage = ({ image, className, alt }) => {
    return (
        <div className="post-image-wrapper">

            <img className={className || 'image-news-parser'} src={image} alt={alt || 'image'} />

        </div>
    )
}