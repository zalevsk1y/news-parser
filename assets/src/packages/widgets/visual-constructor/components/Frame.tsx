import React, { useRef, useEffect } from 'react';
import { getPluginDirUrl } from '@news-parser/helpers/index';
// modifiers 
import purifyDOM from '@news-parser/helpers/frame/FrameElement/modifiers/purifyDOM';


import FrameElement, { frameElement } from '@news-parser/helpers/frame/FrameElement/FrameElement';

import { useToggleContent } from '@news-parser/entities/sidebarTemplate/hooks/useToggleContent';
import { useResetSidebarTemplate } from '@news-parser/entities/sidebarTemplate/hooks/';
import { useResetSidebar } from '@news-parser/entities/sidebar/hooks';
import { useFetchHTML, useMouseEvents, useFrameElementMiddleware } from '../hooks';
import { useShowMessage } from '@news-parser/entities/message/hooks/index';
import { useClose } from '../hooks/visual-constructor/useClose';

interface FrameProps {
  onReady: () => void,
  url: string
}

/**
* This is a frame element used in the visual constructor modal window, allowing users to manually choose parsing content.
*
* @since 1.0.0
* @param {string} url - url for iframe element
* @param {Function} onReady - Callback function to execute when the frame is ready.
* @returns {JSX.Element} Returns the frame element with an iFrame tag containing the visual constructor.
*/

export const Frame: React.FC<FrameProps> = ({ onReady, url }) => {
  const frameElementRef = useRef<HTMLIFrameElement>(null);
  const frame = useRef<{value:FrameElement|null}>({value:null});
  const [isHTMLFetching, startHTMLFetching] = useFetchHTML();
  const showMessage=useShowMessage();
  const closeVisualConstructor = useClose();
  const [getTitle, getFeaturedMedia] = useFrameElementMiddleware();
  const [mouseOver, mouseOut] = useMouseEvents();
  const [selectElement, removeElement, setFarame] = useToggleContent();
  const resetSelectedContent = useResetSidebarTemplate();
  const resetSidebarData = useResetSidebar();
  const clickHandler = (event:MouseEvent|Event) => {
    event.preventDefault();
    const targetElement=event.target as HTMLElement;
    const {className} = targetElement;
    if (className.search(' parser-select') === -1) {
      targetElement.className = `${className} parser-select`;
      selectElement(targetElement);
    } else {
      targetElement.className = className.replace(' parser-select', '');
      removeElement(targetElement);
    }
  };
  const initFrame = (html: string, frameRef: React.RefObject<HTMLIFrameElement>) => {
    if (frameRef.current === null) return;
    const newFrame = frameElement(frameRef.current, url)
      .injectHTML(html, [purifyDOM])
      .injectCSS({
        parent: 'head',
        tag: 'link',
        href: `${getPluginDirUrl()  }/public/css/frame-style.css`,
      })
      .bindEvents([
        ['mouseover', mouseOver],
        ['mouseout', mouseOut],
        ['click', clickHandler],
      ])
      .runMiddleware([
        getTitle,
        getFeaturedMedia
      ])
      .runMethodWhenReady(
        onReady
      )
    frame.current.value = newFrame;
  };
  useEffect(() => {
    resetSelectedContent();
    resetSidebarData();
    if (url) {
      startHTMLFetching(url).then(resp => initFrame(resp.data, frameElementRef)).catch(error=>{
        closeVisualConstructor();
        showMessage('error',error.message)
      });
      frameElementRef.current!==null&&setFarame(frameElementRef.current)
    }
    return () => {
      if (frame.current.value !== null) {
        frame.current.value.shutDown();
      }
    };
  }, [url]);
  return (
    <iframe id='visual-constructor' frameBorder='0' ref={frameElementRef}>
      {' '}
    </iframe>
  );
}
