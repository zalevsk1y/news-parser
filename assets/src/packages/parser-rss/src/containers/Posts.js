import React from 'react';
import Post from './Post';
import PropTypes from 'prop-types';
/**
 * Renders posts from post array.
 * 
 * @since 0.8.0
 */
export default function Posts(props){
        const posts=props.posts||[];
        return (
            <div className="posts-wrapper">
                {
                    posts.map(post=>{
                        return <Post key={post._id.toString()} {...post} postId={post._id}  status={post.status}/>
                    })
                }
            </div>
        )
        
}



Posts.propTypes={
    /**
     * Array of posts.
     */
    posts:PropTypes.array.isRequired
}