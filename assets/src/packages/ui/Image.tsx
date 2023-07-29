import React from "react";
import config  from "@news-parser/config";

export interface ImageProps {
    src?: string;
    className?: string;
    alt?: string;
    style?: React.CSSProperties;
  }
  
export const Image:React.FC<ImageProps> = ({ src, className, alt, style }) => {
    
    return <img src={src ? src : config.defaultImage} style={style?style:{}} className={className ? className : ''} alt={alt ? alt : ''} />
}