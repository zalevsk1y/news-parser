import React, { useCallback,useMemo } from 'react';
import { PostCard,PostCardBody,PostCardHeader,PostCardImage,PostCardFooter } from '@news-parser/ui/post-card';
import { Icons } from '@news-parser/ui';
/**
 * Renders posts from post array.
 * 
 * @since 0.8.0
 */


export const Posts = ({ openEditor,selectPost,posts }) => {
    
    const onClickEditPost = useCallback((post)=>(event) => {
        event.preventDefault();
        window.open(post.draft.editLink, '_blank').focus();
    }, []);
    const selectPostHandler=useCallback((_id)=>(event)=>selectPost(_id),[selectPost])
    const openEditorHandler = useCallback((_id, link) => () => openEditor(_id, link), [openEditor]);
    const postCards=useMemo(()=>{
        return posts.map(post => {
            return (<PostCard key={post.title} status={post.status} >
                <PostCardHeader pubDate={post.pubDate} />
                <PostCardImage link={post.link} image={post.image} alt={post.title} />
                <PostCardBody title={post.title} description={post.description} />
                <PostCardFooter>
                    {post.draft ? <Icons className='fo fo-edit' title="Edit post" onClick={onClickEditPost(post)} /> :
                        [<Icons key="select" className={'fo fo-select' + (post.select === true ? ' icon-selected' : '')} title={post.select === true ? 'Unselect post' : 'Select post'} onClick={selectPostHandler(post._id)} />,
                            <Icons key="visual-editor" className='fo fo-visual-constructor' title='Visual constructor' onClick={openEditorHandler(post._id, post.link)} />]}
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