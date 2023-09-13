import React, { useCallback } from 'react';
import Message from '@news-parser/modules/Message';
import SidebarRight, { SidebarRightTemplateSingle, SidebarRightPost } from '@news-parser/modules/SidebarRight/sidebar-tabs/';
import { VisualConstructor, VisualConstructorFooterPage as VisualConstructorFooter } from '@news-parser/widgets/visual-constructor/components/index';
import { useOpenVisualConstructor } from '@news-parser/widgets/visual-constructor/hooks';
import { useCreateLocalPost } from '@news-parser/entities/post/hooks/';
import { InputFormSection } from './InputFormSection';
import { ParsedPostsSection } from './ParsedPostsSection';
import '../../styles/Main.css';

/**
 * Main application element.
 * 
 * @since 0.8.0
 */


const Main:React.FC = () => {
  const openVisualConstructor = useOpenVisualConstructor();
  const createLocalPost=useCreateLocalPost();
 
  const openVisualConstructorHandler = useCallback((url:string) => {
    openVisualConstructor(false,url);
  }, [createLocalPost,openVisualConstructor])
  return (
    <div className="wrap">
      <VisualConstructor >
        <SidebarRight tabs={['Templat', 'Post']}>
          <SidebarRightTemplateSingle />
          <SidebarRightPost />
        </SidebarRight>
        <VisualConstructorFooter />
      </VisualConstructor>
      <div className='parsing-title'>
            <h1>News-Parser <b className='main-page-header'>WEB PAGE</b></h1>
        </div>
      <Message />
      <InputFormSection buttonName='Parse page' inputSubmit={openVisualConstructorHandler} />
      <ParsedPostsSection  />
    </div>
  );
}


export default Main;
