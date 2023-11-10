import React, { useCallback } from 'react';
import Message from '@news-parser/modules/Message';
import SidebarRight, { SidebarRightTemplate, SidebarRightPost } from '@news-parser/modules/SidebarRight/components/tabs';
import { VisualConstructor, VisualConstructorFooterPage as VisualConstructorFooter } from '@news-parser/widgets/visual-constructor/components/index';
import { useOpenVisualConstructor } from '@news-parser/widgets/visual-constructor/hooks';
import { useCreateLocalPost } from '@news-parser/entities/post/hooks/';
import { InputFormSection } from '../../../components/InputFormSection/InputFormSection';
import { ParsedPostsSection } from './ParsedPostsSection';
import { useShowMessage } from '@news-parser/entities/message/hooks';
import { MESSAGE, PAGES } from '@news-parser/config/i18n';
import '../../styles/Main.css';



/**
 * Main application element.
 * 
 * @since 0.8.0
 */


const Main: React.FC = () => {
  const showMessage = useShowMessage();
  const openVisualConstructor = useOpenVisualConstructor();
  const createLocalPost = useCreateLocalPost();
  const inputButtonName = PAGES.PARSER_PAGE.INPUT_BUTTON;
  const invalidInputHandler = useCallback(() => showMessage('error', MESSAGE.ERROR.WRONG_URL_INPUT), [])
  const openVisualConstructorHandler = useCallback((url: string) => {
    openVisualConstructor(false, url);
  }, [createLocalPost, openVisualConstructor])
  return (
    <div className="wrap">
      <VisualConstructor >
        <SidebarRight tabs={['Templat', 'Post']}>
          <SidebarRightTemplate />
          <SidebarRightPost />
        </SidebarRight>
        <VisualConstructorFooter />
      </VisualConstructor>
      <div className='parsing-title'>
        <h1>News-Parser <b className='main-page-header'>WEB PAGE</b></h1>
      </div>
      <Message />
      <InputFormSection buttonName={inputButtonName}
        inputSubmit={openVisualConstructorHandler}
        onInvalid={invalidInputHandler}
        disabled={false}
      />
      <ParsedPostsSection />
    </div>
  );
}


export default Main;
