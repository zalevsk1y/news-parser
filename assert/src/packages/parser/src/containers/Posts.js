import React from 'react';
import Post from './Post';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

export class Posts extends React.Component{
    constructor(props){
        super(props);
  
        this.renderPostsFromArray=this.renderPostsFromArray.bind(this);
    }

    renderPostsFromArray(props){
        return props.postsArray.map((post)=>{
            return(
                <Post key={post._id.toString()} {...post} postId={post._id}  status={post.status}/>
            )
        })
    }
    rowWrapper(posts,key){
        return (
            <div key={"row"+key.toString()} className="row">
            <this.renderPostsFromArray postsArray={posts} />
            </div>
        )
    }
    render(){
        return (
            <div class="posts-wrapper">
                <this.renderPostsFromArray postsArray={this.props.posts} />
            </div>
        )
        
    }
}

function mapStateToProps (state){
 
    const posts=state.parse.items.hasOwnProperty('data')?state.parse.items.data:[];
    return{
        posts
    }
}

export default connect(mapStateToProps)(Posts);

Posts.propTypes={
    posts:PropTypes.array.isRequired
}