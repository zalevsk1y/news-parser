import React, { useCallback, useMemo, useState } from 'react';
import Posts from '@news-parser/modules/Posts';
import { ActionAlert } from '@news-parser/ui/ActionAlert';
import { useGetPosts, useSelectPost } from '@news-parser/entities/post/hooks/'
import { useGetTemplate } from '@news-parser/entities/template/hooks/'
import { useShowMessage } from '@news-parser/entities/message/hooks/'
import { useOpenVisualConstructor } from '@news-parser/widgets/visual-constructor/hooks'
import { useParsePosts } from '@news-parser/entities/post/hooks';
import { ProgressIndicator } from '@news-parser/components/ProgressIndicator';
import { MESSAGE, PAGES } from '@news-parser/config/i18n';

interface PostsSectionProps {
    isFetching: boolean,
    rssUrl: string | false
}

export const PostsSection: React.FC<PostsSectionProps> = ({ isFetching, rssUrl }) => {
    const [progressTotal, setProgressTotal] = useState(0);
    const showMessage = useShowMessage();
    const [parsedPostsCounter, isParsing, parsePosts] = useParsePosts();
    const openVisualConstructor = useOpenVisualConstructor();
    const posts = useGetPosts();
    const template = useGetTemplate();
    const toggleSelectPost = useSelectPost();

    const toggleSelectPostHandler = useCallback((_id: number) => {
        if (!template) {
            showMessage('error', MESSAGE.ERROR.NO_SAVED_PARSING_TEMPLATE);
        } else {
            toggleSelectPost(_id)
        }
    }, [template]);
    const [selectedPosts, selectedPostsCount] = useMemo(() => {
        const sp = posts.filter(post => post.select)
        return [sp, sp.length]
    }, [posts]);
    const alertPostWord=selectedPostsCount===1?PAGES.PARSER_RSS.POST:(selectedPostsCount>1&&selectedPostsCount<5)?PAGES.PARSER_RSS.POSTS2:PAGES.PARSER_RSS.POSTS5;
    const alertPostsParseMessage = <>{PAGES.PARSER_RSS.POSTS_SECTION_MESSAGE} <strong>{selectedPostsCount}</strong> {alertPostWord}.</>;
    const parseSelectedHandler = useCallback(() => {
        if (typeof rssUrl !== 'string') return;
        parsePosts(selectedPosts, 'race', rssUrl)
            .then(() => showMessage('success', MESSAGE.SUCCESS.POSTS_PARSED))
            .catch(() => showMessage('error', MESSAGE.ERROR.COULD_NOT_PARSE_POSTS));
        setProgressTotal(selectedPosts.length);
    }, [selectedPosts]);
    const postsParsedMessage=`${parsedPostsCounter}/${progressTotal} ${parsedPostsCounter===1?PAGES.PARSER_RSS.POST_WAS_PARSED:(parsedPostsCounter>1&&parsedPostsCounter<5)?PAGES.PARSER_RSS.POST_WAS_PARSED2:PAGES.PARSER_RSS.POST_WAS_PARSED5}`
    return (
        <>

            <ProgressIndicator hidden={!isParsing} total={progressTotal} count={parsedPostsCounter}>
                <div className='progress-message'>{postsParsedMessage}</div>
                <div className='progress-message d-flex flex-row align-items-center justify-content-center'>
                    <span className="spinner-border" role="status" aria-describedby='posts-loading-indicator-description'></span>
                    <span id='posts-loading-indicator-description'>&nbsp;&nbsp;{PAGES.PARSER_RSS.PROGESS_WAIT}</span>
                </div>
            </ProgressIndicator>
            <ActionAlert hidden={selectedPostsCount === 0 || isParsing} >
                <span className='flex-grow-1 lh-2'>{alertPostsParseMessage}</span>
                <button className="btn btn-secondary" onClick={parseSelectedHandler} disabled={!rssUrl}>{PAGES.PARSER_RSS.PARSE_BUTTON}</button>
            </ActionAlert>
            {!isFetching && <Posts selectPost={toggleSelectPostHandler} posts={posts} openEditor={openVisualConstructor} />}
        </>
    )
}