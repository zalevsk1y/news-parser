import React, { useCallback } from 'react';
import Post from './Post';
import { table } from '@news-parser/helpers/classes/Table';
import { useGetPosts } from '@news-parser/entity/post/hooks';
import { PostCard } from '@news-parser/ui//PostCard';
import { PostCardBody } from '@news-parser/ui//PostCardBody';
import { PostCardHeader } from '@news-parser/ui//PostCardHeader';
import { PostCardImage } from '@news-parser/ui//PostCardImage';
import { PostCardFooter } from '@news-parser/ui//PostCardFooter';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
/**
 * Renders posts from post array.
 * 
 * @since 0.8.0
 */
export class Posts1 extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="posts-wrapper">
                {
                    this.props.posts.map(post => {
                        return <Post key={post._id.toString()} {...post} postId={post._id} status={post.status} />
                    })
                }
            </div>
        )

    }
}

function mapStateToProps(state) {
    const { data, select, draft } = state.parse.items,
        posts = data ? table(data).join({ select, draft }) : [];
    return {
        posts
    }
}

export default connect(mapStateToProps)(Posts);

Posts.propTypes = {
    /**
     * Array of posts.
     */
    posts: PropTypes.array.isRequired
}


export const Posts = ({openEditor}) => {
    const [posts] = useGetPosts();
    const onClickEditPost = useCallback((event) => {
        event.preventDefault();
        window.open(draft.editLink, '_blank').focus();
    }, []);
    const openEditorHandler=useCallback((_id,link)=>()=>openEditor(_id,link),[])
    return (
        <div className="posts-wrapper">
            {
                posts.map(post => {
                    return (<PostCard status={post.status} >
                        <PostCardHeader pubDate={post.pubDate} />
                        <PostCardImage link={post.link} image={post.image} alt={post.title} />
                        <PostCardBody title={post.title} description={post.description} />
                        <PostCardFooter>
                            {post.draft && <Icons className='fo fo-edit' title="Edit post" onClick={onClickEditPost} />}
                            {post.select && (<Icons className={'fo fo-select' + (select === true ? ' icon-selected' : '')} title={select === true ? 'Unselect post' : 'Select post'} onClick={this.selectPost} />,
                                <Icons className='fo fo-visual-constructor' title='Visual constructor' onClick={openEditorHandler(post._id,post.link)} />)}
                        </PostCardFooter>
                    </PostCard>)
                })
            }
        </div>
    )
}