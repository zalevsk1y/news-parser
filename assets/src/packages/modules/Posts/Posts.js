import React, { useCallback } from 'react';
import Post from './Post';
import { PostCard } from '@news-parser/ui//PostCard';
import { PostCardBody } from '@news-parser/ui/PostCardBody';
import { PostCardHeader } from '@news-parser/ui//PostCardHeader';
import { PostCardImage } from '@news-parser/ui/PostCardImage';
import { PostCardFooter } from '@news-parser/ui/PostCardFooter';

/**
 * Renders posts from post array.
 * 
 * @since 0.8.0
 */


export const Posts = ({ openEditor,posts }) => {
    
    const onClickEditPost = useCallback((event) => {
        event.preventDefault();
        window.open(draft.editLink, '_blank').focus();
    }, []);
    const openEditorHandler = useCallback((_id, link) => () => openEditor(_id, link), []);
    const postCards=useMemo(()=>{
        reuturn posts.map(post => {
            return (<PostCard key={post.title} status={post.status} >
                <PostCardHeader pubDate={post.pubDate} />
                <PostCardImage link={post.link} image={post.image} alt={post.title} />
                <PostCardBody title={post.title} description={post.description} />
                <PostCardFooter>
                    {post.draft ? <Icons className='fo fo-edit' title="Edit post" onClick={onClickEditPost} /> :
                        (<Icons className={'fo fo-select' + (post.select === true ? ' icon-selected' : '')} title={post.select === true ? 'Unselect post' : 'Select post'} onClick={selectPost} />,
                            <Icons className='fo fo-visual-constructor' title='Visual constructor' onClick={openEditorHandler(post._id, post.link)} />)}
                </PostCardFooter>
            </PostCard>)
        })
    },[posts])
    return (
        <div className="posts-wrapper">
            {postCards}
        </div>
    )
}