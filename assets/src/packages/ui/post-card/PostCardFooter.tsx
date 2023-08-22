import React from 'react';
import '../styles/PostCardFooter';

export interface PostCardFooterProps {
    children: React.ReactNode
}

/**
 * A component for rendering the footer of a post card.
 *
 * @param {PostCardFooterProps} props - The props for the component.
 * @param {React.ReactNode} props.children - The child content to display within the footer.
 * 
 * @returns {JSX.Element} The rendered PostCardFooter component.
 */


export const PostCardFooter: React.FC<PostCardFooterProps> = ({ children }) => (
        <div className='footer-post'>
            {children}
        </div>
    )