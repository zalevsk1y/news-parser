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
import { useParsePost } from '@news-parser/entities/post/hooks';

/**
 * Main application element.
 * 
 * @since 0.8.0
 */


const Main = () => {
  const showMessage = useShowMessage();
  const [isPostsFetching, fetchPostsList] = useFetchPostsList();
  const [isTemplateFetching, fetchTemplate] = useFetchTemplate();
  const openVisualConstructor=useOpenVisualConstructor();
  const parsePost=useParsePost()
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
    const sp = posts.filter(post => post.select)
    return [sp, sp.length]
  }, [posts]);
  const isParseSelectedPostsDisabled = useMemo(() => !template, [template])
  const parseSelectedHandler = useCallback(() => {
    let postsCounter=selectedPosts.length;
    selectedPosts.forEach(post=>{
    parsePost(post.url,post._id).tnen(()=>console.log(postsCounter--))
  })

}, [selectedPosts]);
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

      {selectedPostsCount>0&&<SelectedPostsInfo disabled={isParseSelectedPostsDisabled} submitAction={parseSelectedHandler} selectedPostsCount={selectedPostsCount} />}

      <Posts selectPost={toggleSelectPost} posts={posts} openEditor={openVisualConstructor} />
    </div>
  );
}


export default Main;
