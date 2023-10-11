import React from 'react';
import config from '@news-parser/config/index';

export type ImageProps ={
  src?: string,
  className?: string,
  alt?: string,
  style?: React.CSSProperties,
  defaultImage?: string
}

/**
 * A component for rendering images.
 * 
 * @param {ImageProps} props - The props for the component.
 * @param {string} props.src - The source URL for the image.
 * @param {string} props.className - The CSS class name(s) for the image.
 * @param {string} props.alt - The alternate text for the image.
 * @param {string} defaultImage - defaul image
 * @param {React.CSSProperties} props.style - The inline styles for the image.
 * 
 * @returns {JSX.Element} The rendered Image component.
 */


export const Image: React.FC<ImageProps> = ({ src, className, alt, style, defaultImage }) => <img src={src || (defaultImage || config.defaultImage)} style={style || {}} className={className || ''} alt={alt || ''} />