import React, { useCallback, useMemo, useState } from 'react';
import Posts from '@news-parser/modules/Posts';
import { ActionAlert } from '@news-parser/components/ActionAlert';
import { useGetPosts, useSelectPost } from '@news-parser/entities/post/hooks/'
import { useGetTemplate } from '@news-parser/entities/template/hooks/'
import { useShowMessage } from '@news-parser/entities/message/hooks/'
import { useOpenVisualConstructor } from '@news-parser/widgets/visual-constructor/hooks'
import { useParsePosts } from '@news-parser/entities/post/hooks';
import { ProgressIndicator } from '@news-parser/components/ProgressIndicator';

export const PostsSection = ({ isFetching }) => {
    const showMessage = useShowMessage();
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
    return (
        <>
            {!isFetching&&<Posts selectPost={toggleSelectPostHandler} posts={posts} openEditor={openVisualConstructor} />}
        </>
    )
}