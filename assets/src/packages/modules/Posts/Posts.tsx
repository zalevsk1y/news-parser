import React, { useCallback, useMemo } from 'react';
import { PostCard, PostCardBody, PostCardHeader, PostCardImage, PostCardFooter } from '@news-parser/ui/post-card/index';
import { Icons } from '@news-parser/ui/index';
import { Post } from 'types/post';
import { window } from 'globals';
import {InfinitePostsScroll} from './InfinitePostsScroll';

export interface PostsProps {
    openEditor: (_id: number, link: string) => void,
    selectPost: (_id: number) => void,
    posts: Array<Post>
}
/**
 * Renders posts from post array.
 * 
 * @since 0.8.0
 */


export const Posts: React.FC<PostsProps> = ({ openEditor, selectPost, posts }) => {
    const onClickEditPost = useCallback((post: Post) => () => {
        const postDraftInfo = post.draft;
        if (postDraftInfo !== undefined) {
            const newWindowObject = window.open(postDraftInfo.editLink, '_blank');
            newWindowObject?.focus();
        }
    }, []);
    const selectPostHandler = useCallback((_id: number) => () => selectPost(_id), [selectPost])
    const openEditorHandler = useCallback((_id: number, link: string) => () => openEditor(_id, link), [openEditor]);
    const postCards = useMemo(() => posts.map(post => (<PostCard key={post.title} selected={!!post.select} >
        <PostCardHeader pubDate={post.pubDate} />
        <PostCardImage image={post.image} alt={post.title} />
        <PostCardBody title={post.title} description={post.description} link={post.link} />
        <PostCardFooter>
            {post.draft ? <Icons type='button' id={`post-edit-icon-${post._id}`} className='fo fo-edit' onClick={onClickEditPost(post)} ariaLabel='Edit post' /> :
                [<Icons key={`select-post-${post._id}`} type='checkbox' id={`post-select-icon-${post._id}`} className={`fo fo-select${post.select === true ? ' icon-selected' : ''}`}  onClick={selectPostHandler(post._id)} ariaLabel={post.select === true ? 'Unselect post' : 'Select post'} />,
                <Icons key={`post-visual-editor-${post._id}`} type='button' id={`post-visual-editor-icon-${post._id}`} className='fo fo-visual-constructor' ariaLabel='Visual constructor' onClick={openEditorHandler(post._id, post.link)}  />]}
        </PostCardFooter>
    </PostCard>)), [posts, selectPostHandler, openEditorHandler])
    return (
        <div className="posts-wrapper">
            <InfinitePostsScroll className='posts-wrapper' postsArray={postCards} postsPerWindow={9} />
        </div>
    )
}