import { frameElement } from '@news-parser/helpers/frame/FrameElement/FrameElement';
import { useMouseEvents } from './useMouseEvents';
import { useFrameElementMiddleware } from './useFrameElementMiddleware';
import { getPluginDirUrl } from '@news-parser/helpers/index';
// modifiers 
import purifyDOM from '@news-parser/helpers/frame/FrameElement/modifiers/purifyDOM';
import { useMemo } from 'react';

export type FrameObjectType={
  url:string,
  init:(html:string)=>void,
  onReady:(callback:()=>void)=>void,
  shutDown:()=>void
}
export type UseFrameElement=(frameRef: HTMLIFrameElement|null, url: string|false)=>FrameObjectType|null;

export const useFrameElement:UseFrameElement = (frameRef, url) => {
  const [getTitle, getFeaturedMedia] = useFrameElementMiddleware();
  const [mouseOver, mouseOut, mouseClickHandler] = useMouseEvents(frameRef);
  
  return useMemo(() => {
    if (frameRef===null||url===false) return null;
    const frame = frameElement(frameRef, url);
    return {
      url:url,
      init: (html:string) => {
        frame
          .injectHTML(html, [purifyDOM])
          .injectCSS({
            parent: 'head',
            tag: 'link',
            href: `${getPluginDirUrl()}/public/css/frame-style.css`,
          })
          .bindEvents([
            ['mouseover', mouseOver],
            ['mouseout', mouseOut],
            ['click', mouseClickHandler],
          ])
          .runMiddleware([
            getTitle,
            getFeaturedMedia
          ])
      },
      onReady:(callback:()=>void)=>{
        frame.runMethodWhenReady(callback)
      },
      shutDown:()=>frame.shutDown()
    }
  }, [frameRef, url])
}