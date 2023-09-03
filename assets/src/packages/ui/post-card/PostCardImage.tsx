import React from 'react';
import '../styles/PostCardImage.css';

export interface PostCardImageProps {
    image: string;
    className?: string;
    alt?: string;
}

/**
 * A component for rendering an image within a post card.
 * 
 * @param {PostCardImageProps} props - The props for the component.
 * @param {string} props.image - The URL of the image to display.
 * @param {string} [props.className] - The CSS class name for the image element.
 * @param {string} [props.alt] - The alt text for the image element.
 * 
 * @returns {JSX.Element} The rendered PostCardImage component.
 */


export const PostCardImage:React.FC<PostCardImageProps> = ({ image, className, alt }) => (
        <div className='post-image-wrapper'>
            <img className={className || 'image-news-parser'} src={image} alt={alt || 'image'} />
        </div>
    )