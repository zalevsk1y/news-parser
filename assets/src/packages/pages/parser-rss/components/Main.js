import React, { useCallback, useMemo, useState } from 'react';
import Message from '@news-parser/modules/Message';
import { InputForm } from '@news-parser/components/InputForm';
import Posts from '@news-parser/modules/Posts';
import SidebarRight,{SidebarRightTemplate,SidebarRightPost} from '@news-parser/modules/SidebarRight';
import { VisualConstructor, VisualConstructorFooterMain as VisualConstructorFooter } from '@news-parser/widgets/visual-constructor/';
import { SelectedPostsInfo } from '@news-parser/components/SelectedPostsInfo';
import { validateIntupUrl, setUrlSearchParams } from '@news-parser/helpers/'
import { getUrlSearchParams } from '@news-parser/helpers/';
import { useFetchPostsList, useGetPosts, useSelectPost } from '@news-parser/entities/post/hooks/'
import { useFetchTemplate, useGetTemplate } from '@news-parser/entities/template/hooks/'
import { useShowMessage } from '@news-parser/entities/message/hooks/'
import { PARSER_RSS_LIST } from '@news-parser/config/constants';
import {useOpenVisualConstructor} from '@news-parser/widgets/visual-constructor/hooks'

/**
 * Main application element.
 * 
 * @since 0.8.0
 */


const Main = () => {
  const showMessage = useShowMessage();
  const [isPostsFetching, fetchPostsList] = useFetchPostsList();
  const [isTemplateReady, fetchTemplate] = useFetchTemplate();
  const openVisualConstructor=useOpenVisualConstructor();
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
  const posts = useGetPosts();
  const template = useGetTemplate();
  const toggleSelectPost = useSelectPost();
  const [selectedPosts, selectedPostsCount] = useMemo(() => {
    const sp = posts.filter(post => post.selected)
    return [sp, sp.length]
  }, [posts]);
  const isParseSelectedPostsDisabled = useMemo(() => !template && !isTemplateReady, [template, isTemplateReady])
  const parseSelectedHandler = useCallback(() => parsePosts(selectedPosts), [selectedPosts]);
  const inputSubmitHandler = useCallback((url) => {
    if (validateIntupUrl(url)) {
      setUrlSearchParams({ entity: PARSER_RSS_LIST, url })
    } else {
      showMessage('error', 'Please enter valid url.');
    }
  }, [PARSER_RSS_LIST, setUrlSearchParams]);

  return (
    <div className={"wrap"}>
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
      <InputForm buttonName="Parse RSS Feed" submitAction={inputSubmitHandler} initValue={mainState.url} disabled={isPostsFetching} />

      <SelectedPostsInfo disabled={isParseSelectedPostsDisabled} submitAction={parseSelectedHandler} selectedPostsCount={selectedPostsCount} />

      <Posts selectPost={toggleSelectPost} posts={posts} openEditor={openVisualConstructor} />
    </div>
  );
}


export default Main;
