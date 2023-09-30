import React from 'react';
import '../styles/PostCardBody.css';

export type PostCardBodyProps= {
    link: string,
    title: string,
    description: string,
}

/**
 * A component for rendering the body of a post card.
 * 
 * @param {PostCardBodyProps} props - The props for the component.
 * @param {string} props.link - The link to the post.
 * @param {string} props.title - The title of the post.
 * @param {string} props.description - The description of the post.
 * 
 * @returns {JSX.Element} The rendered PostCardBody component.
 */

export const PostCardBody: React.FC<PostCardBodyProps> = ({ link, title, description }) => (
        <div className='post-content'>
            <div className='post-title-wrapper'>
                <a className='title-post-link' href={link}>
                    <span className='post-title'>{title}</span>
                </a>
            </div>
            <div className='post-description'>
                <span>{description}</span>
            </div>
        </div>
    )