import React from 'react';
import '../styles/PostCardLarge.css'

export type PostCartLargeProps={
    className?:string,
    children:React.ReactNode
}

/**
 * A component for rendering a large post card.
 * 
 * @param {PostCartLargeProps} props - The props for the component.
 * @param {React.ReactNode} props.children - The child content to display within the component.
 * @param {string} [props.className] - The CSS class name(s) to apply to the component.
 * 
 * @returns {JSX.Element} The rendered PostCartLarge component.
 */


export const PostCartLarge:React.FC<PostCartLargeProps>=({ children, className })=>(
        <div className={` pt-2 pb-3 ${className??''}`}>
            {children}
        </div>
    )