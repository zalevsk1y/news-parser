import React from "react";
import config  from "@news-parser/config";

export const Image = ({ src, className, alt, style }) => {
    
    return <img src={src ? src : config.defaultImage} style={style?style:{}} className={className ? className : ''} alt={alt ? alt : ''} />
}