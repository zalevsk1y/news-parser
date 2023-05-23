import React from "react";

export const Image = ({ src, className, alt, defaultImage }) => {
    return <img src={src ? src : defaultImage} className={className ? className : ''} alt={alt ? alt : ''} />
}