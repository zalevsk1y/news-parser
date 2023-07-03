import React, { useState } from 'react';
import Message from '@news-parser/modules/Message';
import SidebarRight, { SidebarRightTemplate, SidebarRightPost } from '@news-parser/modules/SidebarRight';
import { VisualConstructor, VisualConstructorFooterRss as VisualConstructorFooter } from '@news-parser/widgets/visual-constructor/';
import { getUrlSearchParams } from '@news-parser/helpers/';
import { useFetchPostsList } from '@news-parser/entities/post/hooks/'
import { useFetchTemplate } from '@news-parser/entities/template/hooks/'
import { InputFormSection } from './InputFormSection';
import { PostsSection } from './PostsSection';

/**
 * Main application element.
 * 
 * @since 0.8.0
 */


const Main = () => {
  const [isPostsFetching, fetchPostsList] = useFetchPostsList();
  const [isTemplateFetching, fetchTemplate] = useFetchTemplate();
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
      <InputFormSection buttonName="Parse RSS Feed" initValue={mainState.url} disabled={isPostsFetching} />
      <PostsSection isFetching={isPostsFetching||isTemplateFetching} />
    </div>
  );
}


export default Main;
