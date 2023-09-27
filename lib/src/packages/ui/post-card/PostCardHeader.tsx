import React from 'react';
import '../styles/PostCardHeader.css';

export interface PostCardHeaderProps {
    pubDate: string;
}

/**
 * A component for rendering the header of a post card.
 * 
 * @param {PostCardHeaderProps} props - The props for the component.
 * @param {string} props.pubDate - The publication date of the post.
 * 
 * @returns {JSX.Element} The rendered PostCardHeader component.
 */

export const PostCardHeader:React.FC<PostCardHeaderProps>=({ pubDate })=> {
    return (
        <div className='post-time'>
            <span className='fo fo-clock' />
            <span className='post-time-header'>{pubDate}</span>
        </div>
    )
}