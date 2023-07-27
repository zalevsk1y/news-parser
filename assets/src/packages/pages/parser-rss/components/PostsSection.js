import React, { useCallback, useMemo, useState } from 'react';
import Posts from '@news-parser/modules/Posts';
import { ActionAlert } from '@news-parser/components/ActionAlert';
import { useGetPosts, useSelectPost } from '@news-parser/entities/post/hooks/'
import { useGetTemplate } from '@news-parser/entities/template/hooks/'
import { useShowMessage } from '@news-parser/entities/message/hooks/'
import { useOpenVisualConstructor } from '@news-parser/widgets/visual-constructor/hooks'
import { useParsePosts } from '@news-parser/entities/post/hooks';
import { ProgressIndicator } from '@news-parser/components/ProgressIndicator';

export const PostsSection = ({ isFetching,rssUrl }) => {
    const [progressTotal, setProgressTotal] = useState(0);
    const showMessage = useShowMessage();
    const [parsedPostsCounter, isParsing, parsePosts] = useParsePosts();
    const openVisualConstructor = useOpenVisualConstructor();
    const posts = useGetPosts();
    const template = useGetTemplate();
    const toggleSelectPost = useSelectPost();
    const toggleSelectPostHandler = useCallback((_id) => {
        if (!template) {
            showMessage('error', 'Save parsing template first.');
        } else {
            toggleSelectPost(_id)
        }
    }, [template]);
    const [selectedPosts, selectedPostsCount] = useMemo(() => {
        const sp = posts.filter(post => post.select)
        return [sp, sp.length]
    }, [posts]);
    const postsParseMessage = <>You have selected <strong>{selectedPostsCount}</strong> posts.</>;
    const parseSelectedHandler = useCallback(() => {
        parsePosts(selectedPosts, 'race',rssUrl);
        setProgressTotal(selectedPosts.length);
    }, [selectedPosts]);
    return (
        <>
            <ProgressIndicator hidden={!isParsing} total={progressTotal} count={parsedPostsCounter}>
                <div className='progress-message'>{`${parsedPostsCounter}/${progressTotal} posts were parsed.`}</div>
            </ProgressIndicator>
            <ActionAlert hidden={selectedPostsCount === 0 || isParsing} >
                <span className='flex-grow-1 lh-2'>{postsParseMessage}</span>
                <button className="btn btn-secondary" onClick={parseSelectedHandler}>Parse</button>
            </ActionAlert>
            {!isFetching&&<Posts selectPost={toggleSelectPostHandler} posts={posts} openEditor={openVisualConstructor} />}
        </>
    )
}