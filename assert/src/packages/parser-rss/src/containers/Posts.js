import React from 'react';
import Post from './Post';
import {table} from '@news-parser/helpers/classes/Table'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
/**
 * Renders posts from post array.
 * 
 * @since 0.8.0
 */
export class Posts extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="posts-wrapper">
                {
                    this.props.posts.map(post=>{
                        return <Post key={post._id.toString()} {...post} postId={post._id}  status={post.status}/>
                    })
                }
            </div>
        )
        
    }
}

function mapStateToProps (state){
    const {data,select,draft}=state.parse.items,
        posts=data?table(data).join({select,draft}):[];
    return{
        posts
    }
}

export default connect(mapStateToProps)(Posts);

Posts.propTypes={
    /**
     * Array of posts.
     */
    posts:PropTypes.array.isRequired
}