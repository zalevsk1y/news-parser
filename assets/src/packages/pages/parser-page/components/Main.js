import React, { useCallback, useMemo } from 'react';
import Message from '@news-parser/modules/Message';
import SidebarRight, { SidebarRightTemplate, SidebarRightPost } from '@news-parser/modules/SidebarRight';
import { VisualConstructor, VisualConstructorFooterPage as VisualConstructorFooter } from '@news-parser/widgets/visual-constructor/';
import { useOpenVisualConstructor } from '@news-parser/widgets/visual-constructor/hooks';
import { InputFormSection } from './InputFormSection';
import { PostsSection } from './PostsSection';
import { useCreateLocalPost } from '@news-parser/entities/post/hooks/';

/**
 * Main application element.
 * 
 * @since 0.8.0
 */


const Main = () => {
  const openVisualConstructor = useOpenVisualConstructor();
  const createLocalPost=useCreateLocalPost();
 
  const openVisualConstructorHandler = useCallback((url) => {
    openVisualConstructor(undefined,url);
  }, [createLocalPost,openVisualConstructor])
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
      <InputFormSection buttonName="Parse page" inputSubmit={openVisualConstructorHandler} />
      <PostsSection />
    </div>
  );
}


export default Main;
