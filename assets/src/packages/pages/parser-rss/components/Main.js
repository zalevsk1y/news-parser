import React, { useCallback, useMemo, useState } from 'react';
import Message from '@news-parser/modules/Message';
import { InputForm } from '@news-parser/components/InputForm';
import Posts from '@news-parser/modules/Posts';
import SidebarRight, { SidebarRightTemplate, SidebarRightPost } from '@news-parser/modules/SidebarRight';
import { VisualConstructor, VisualConstructorFooterMain as VisualConstructorFooter } from '@news-parser/widgets/visual-constructor/';
import { SelectedPostsInfo } from '@news-parser/components/SelectedPostsInfo';
import { getUrlSearchParams } from '@news-parser/helpers/';
import { useFetchPostsList, useGetPosts, useSelectPost } from '@news-parser/entities/post/hooks/'
import { useFetchTemplate, useGetTemplate } from '@news-parser/entities/template/hooks/'
import { useShowMessage } from '@news-parser/entities/message/hooks/'
import { useOpenVisualConstructor } from '@news-parser/widgets/visual-constructor/hooks'
import { useParsePosts } from '@news-parser/entities/post/hooks';
import { ProgressIndicator } from '@news-parser/components/ProgressIndicator';
import { InputFormUrl } from './InputFormUrl';

/**
 * Main application element.
 * 
 * @since 0.8.0
 */


const Main = () => {
  const showMessage = useShowMessage();
  const [isPostsFetching, fetchPostsList] = useFetchPostsList();
  const [isTemplateFetching, fetchTemplate] = useFetchTemplate();
  const openVisualConstructor = useOpenVisualConstructor();
  const [parsedPostsCounter, isParsing, parsePosts] = useParsePosts()
  const [mainState] = useState(() => {
    const searchParams = getUrlSearchParams();
    const url = searchParams.has('url') ? searchParams.get('url') : false;
    if (url) {
      fetchPostsList(url);
      fetchTemplate(url);
    }
    return {
      url
    };
  });
  const [progressTotal, setProgressTotal] = useState(0);
  const posts = useGetPosts();
  const template = useGetTemplate();
  const toggleSelectPost = useSelectPost();
  const [selectedPosts, selectedPostsCount] = useMemo(() => {
    const sp = posts.filter(post => post.select)
    return [sp, sp.length]
  }, [posts]);
  const isParseSelectedPostsDisabled = useMemo(() => !template, [template])
  const parseSelectedHandler = useCallback(() => {
    parsePosts(selectedPosts, 'race');
    setProgressTotal(selectedPosts.length);
  }, [selectedPosts]);
  
  return (
    <div className={"wrap"}>
      {isParsing && <ProgressIndicator total={progressTotal} count={parsedPostsCounter}>
        <div className='progress-message'>{`${parsedPostsCounter}/${progressTotal} posts were parsed.`}</div>
      </ProgressIndicator>}
      <VisualConstructor >
        <SidebarRight tabs={['Templat', 'Post']}>
          <SidebarRightTemplate />
          <SidebarRightPost />
        </SidebarRight>
        <VisualConstructorFooter />
      </VisualConstructor>
      <div className="parsing-title">
        <h1>News-Parser</h1>
      </div>
      <Message />
      <InputFormUrl buttonName="Parse RSS Feed" initValue={mainState.url} disabled={isPostsFetching} />

      {selectedPostsCount > 0 && !isParsing && <SelectedPostsInfo disabled={isParseSelectedPostsDisabled} submitAction={parseSelectedHandler} selectedPostsCount={selectedPostsCount} />}

      <Posts selectPost={toggleSelectPost} posts={posts} openEditor={openVisualConstructor} />
    </div>
  );
}


export default Main;
