import React, { useCallback } from 'react';
import Posts from '@news-parser/modules/Posts';
import { useGetPosts, useSelectPost } from '@news-parser/entities/post/hooks/'
import { useGetTemplate } from '@news-parser/entities/template/hooks/'
import { useShowMessage } from '@news-parser/entities/message/hooks/'
import { useOpenVisualConstructor } from '@news-parser/widgets/visual-constructor/hooks'

interface ParsedPostsSectionProps{
    isFetching?:boolean
}

export const ParsedPostsSection:React.FC<ParsedPostsSectionProps> = ({ isFetching }) => {
    const openVisualConstructorStub = useCallback(()=>{},[]);
    const posts = useGetPosts();
    const toggleSelectPostHandlerStub = useCallback((_id:number) => {
    }, []);
    return (
        <>
            {!isFetching&&<Posts selectPost={toggleSelectPostHandlerStub} posts={posts} openEditor={openVisualConstructorStub} />}
        </>
    )
}