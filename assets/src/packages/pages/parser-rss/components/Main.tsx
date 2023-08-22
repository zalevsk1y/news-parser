import React, { useState } from 'react';
import Message from '@news-parser/modules/Message';
import SidebarRight, { SidebarRightTemplate, SidebarRightPost } from '@news-parser/modules/SidebarRight/indext';
import { VisualConstructor, VisualConstructorFooterRss as VisualConstructorFooter } from '@news-parser/widgets/visual-constructor/';
import { useFetchPostsList } from '@news-parser/entities/post/hooks/'
import { useFetchTemplate } from '@news-parser/entities/template/hooks/'
import { useShowMessage } from '@news-parser/entities/message/hooks/';
import { InputFormSection } from './InputFormSection';
import { PostsSection } from './PostsSection';
import '../../styles/Main.css'


/**
 * Main application element.
 * 
 * @since 0.8.0
 */


const Main: React.FC = () => {
  const [isPostsFetching, fetchPostsList] = useFetchPostsList();
  const [isTemplateFetching, fetchTemplate] = useFetchTemplate();
  const showMessage = useShowMessage();
  const [mainState] = useState<{ url: string | false }>(() => {
    const searchParams = new URLSearchParams(window.location.href);
    const url = searchParams.has('url') ? searchParams.get('url') : false;
    if (url) {
      fetchPostsList(url).catch(err => showMessage('error', err.message));
      fetchTemplate(url);
      return { url }
    }
    return { url: false };
  });
  return (
    <div className="wrap">
      <VisualConstructor >
        <SidebarRight tabs={['Templat', 'Post']}>
          <SidebarRightTemplate />
          <SidebarRightPost />
        </SidebarRight>
        <VisualConstructorFooter rssUrl={mainState.url} />
      </VisualConstructor>
      <div className="parsing-title">
        <h1>News-Parser <b className='main-page-header'>RSS</b></h1>
      </div>
      <Message />
      <InputFormSection buttonName="Parse RSS Feed" initValue={mainState.url || ''} disabled={isPostsFetching} />
      <PostsSection isFetching={isPostsFetching || isTemplateFetching} rssUrl={mainState.url} />
    </div>
  );
}


export default Main;
