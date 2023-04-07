import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Message from '@news-parser/message/';
import InputForm from './InputForm';
import Posts from './Posts';
import Indicator from './Indicator';
import {VisualConstructor,VisualConstructorFooter} from '@news-parser/widget/visual-constructor/';
import { useOpenVisualConstructor } from '@news-parser/widget/visual-constructor/hooks'
import PropTypes from 'prop-types';
import { SelectedPostsInfo } from '@news-parser/modules/SelectedPostsInfo';
import { validateIntupUrl } from '@news-parser/helpers'
import { getUrlSearchParams } from '@news-parser/helpers/';
import { useFetchPostsList,useGetPosts } from '@news-parser/entity/postsList/hooks'
import { useFetchTemplate } from '@news-parser/entity/template/hooks/useSetPostsList'
import { useSelectPost } from '@news-parser/entities/post/hooks/useSelectPost';

/**
 * Main application element.
 * 
 * @since 0.8.0
 */


const Main = () => {
  const showMessage = useShowMessage();
  const [isPostsReady,fetchPostsList] = useFetchPostsList();
  const [isTemplateReady,fetchTemplate] = useFetchTemplate(url);
  const [mainState] = useState(() => {
    const searchParams = getUrlSearchParams();
    const url = searchParams.has('url') ? searchParams.get('url') : false;
    fetchPostsList(url);
    fetchTemplate(url);
    return {
      url
    };
  });
  const [posts] = useGetPosts();
  const [template] = useGetTemplate();
  const toggleSelectPost=useSelectPost()
  const [selectedPosts, selectedPostsCount] = useMemo(() => {
    const sp = posts.filter(post => post.selected)
    return [sp, sp.length]
  }, [posts]);
  const isParseSelectedPostsDisabled = useMemo(() => !template && !isTemplateReady, [template, isTemplateFetching])
  const parseSelectedHandler = useCallback(() => parsePosts(selectedPosts), [selectedPosts]);
  const postEditDialogOpenHandler = useOpenVisualConstructor();
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
      <Indicator step={0.5} />
      <Message />
      <InputForm buttonName="Parse RSS Feed" submitAction={inputSubmitHandler} initValue={mainState.url} disabled={isPostsFetching} />

      <SelectedPostsInfo disabled={isParseSelectedPostsDisabled} submitAction={parseSelectedHandler} selectedPostsCount={selectedPostsCount} />

      <Posts selectPost={toggleSelectPost} posts={posts} openEditor={postEditDialogOpenHandler} />
    </div>
  );
}


export default Main;


Main.propTypes = {
  /**
   * Current app parsing entity [list|single|multi]
   */
  submitType: PropTypes.string,
  /**
  * Current app parsing entity parser-rss-[list|page|media]
  */
  entity: PropTypes.string
}