import React, { useRef, useEffect } from "react";
import { getPluginDirUrl } from "@news-parser/helpers";
// modifiers 
import purifyDOM from "@news-parser/helpers/frame/FrameElement/modifiers/purifyDOM";


import { frameElement } from "@news-parser/helpers/frame/FrameElement/FrameElement";

import { useToggleContent } from "@news-parser/entities/sidebarTemplate/hooks/useToggleContent";
import { useFetchHTML, useMouseEvents, useFrameElementMiddleware } from "../hooks/";


/**
* This is a frame element used in the visual constructor modal window, allowing users to manually choose parsing content.
*
* @since 1.0.0
* @param {Function} onReady - Callback function to execute when the frame is ready.
* @returns {JSX.Element} Returns the frame element with an iFrame tag containing the visual constructor.
*/

export const Frame = ({ onReady, url }) => {
  const frameRef = useRef(null);
  const frame = useRef(null);
  const [isHTMLFetching, startHTMLFetching] = useFetchHTML(url);
  const [getTitle, getFeaturedMedia] = useFrameElementMiddleware();
  const [mouseOver, mouseOut] = useMouseEvents();
  const [selectElement, removeElement, setFarame] = useToggleContent(frameRef);
  const initFrame = (html, frameRef) => {
    const newFrame = frameElement(frameRef.current, url)
      .injectHTML(html, [purifyDOM])
      .injectCSS({
        parent: 'head',
        tag: 'link',
        href: getPluginDirUrl() + '/public/css/frame-style.css',
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
    frame.current = newFrame;
  };
  const clickHandler = (event) => {
    event.preventDefault();
    const className = event.target.className;
    const element = event.target;
    if (className.search(' parser-select') === -1) {
      element.className = `${className} parser-select`;
      selectElement(element);
    } else {
      element.className = className.replace(' parser-select', '');
      removeElement(element);
    }
  }
  useEffect(() => {
    if (url) {
        startHTMLFetching(url).then(html => initFrame(html, frameRef));
        setFarame(frameRef.current)
    }
    return () => {
      if (frame.current !== null) {
        frame.current.shutDown();
      }
    };
  }, [url]);
  return (
    <iframe id="visual-constructor" frameBorder="0" ref={frameRef}>
      {' '}
    </iframe>
  );
}
