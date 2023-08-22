import React from 'react';
import '../styles/PostCard';

export interface PostCardProps {
    selected: boolean,
    children: React.ReactNode
}

/**
 * A component for rendering a post card.
 * 
 * @param {PostCardProps} props - The props for the component.
 * @param {'selected'} props.status - The status of the post card.
 * @param {React.ReactNode} props.children - The child content to display within the post card.
 * 
 * @returns {JSX.Element} The rendered PostCard component.
 */


export const PostCard: React.FC<PostCardProps> = ({ selected, children }) => (
        <div className={`post-container ${  selected  ? 'highlight' : ''}`}>
            {children}
        </div>
    )