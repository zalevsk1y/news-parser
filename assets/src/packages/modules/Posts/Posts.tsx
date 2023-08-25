import React, { useCallback, useMemo } from 'react';
import { PostCard, PostCardBody, PostCardHeader, PostCardImage, PostCardFooter } from '@news-parser/ui/post-card';
import { Icons } from '@news-parser/ui/index';
import { Post } from 'types/post';
import {window} from 'globals';

export interface PostsProps{
    openEditor:(_id:number,link:string)=>void,
    selectPost:(_id:number)=>void,
    posts:Array<Post>
}
/**
 * Renders posts from post array.
 * 
 * @since 0.8.0
 */


export const Posts:React.FC<PostsProps> = ({ openEditor, selectPost, posts }) => {
    const onClickEditPost = useCallback((post:Post) => (event:React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const postDraftInfo=post.draft;
        if (postDraftInfo!==undefined){
            const newWindowObject=window.open(postDraftInfo.editLink, '_blank');
            newWindowObject?.focus();
        }
    }, []);
    const selectPostHandler = useCallback((_id:number) => (event:React.MouseEvent<HTMLElement>) => selectPost(_id), [selectPost])
    const openEditorHandler = useCallback((_id:number, link:string) => () => openEditor(_id, link), [openEditor]);
    const postCards = useMemo(() => posts.map(post => (<PostCard key={post.title} selected={!!post.select} >
                <PostCardHeader pubDate={post.pubDate} />
                <PostCardImage  image={post.image} alt={post.title} />
                <PostCardBody title={post.title} description={post.description} link={post.link}/>
                <PostCardFooter>
                    {post.draft ? <Icons className='fo fo-edit' title="Edit post" onClick={onClickEditPost(post)} /> :
                        [<Icons key="select" className={`fo fo-select${  post.select === true ? ' icon-selected' : ''}`} title={post.select === true ? 'Unselect post' : 'Select post'} onClick={selectPostHandler(post._id)} />,
                        <Icons key="visual-editor" className='fo fo-visual-constructor' title='Visual constructor' onClick={openEditorHandler(post._id, post.link)} />]}
                </PostCardFooter>
            </PostCard>)), [posts,selectPostHandler,openEditorHandler])
    return (
        <div className="posts-wrapper">
            {postCards}
        </div>
    )
}