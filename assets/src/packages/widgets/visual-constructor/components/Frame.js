import React, { useRef, useState, useEffect } from "react";
import { getPluginDirUrl } from "@news-parser/helpers";
// modifiers 
import purifyDOM from "@news-parser/helpers/frame/FrameElement/modifiers/purifyDOM";


import { frameElement } from "@news-parser/helpers/frame/FrameElement/FrameElement";

import { useSelector } from "react-redux";
import { useFrameContent } from "../visual-constructor/src/hooks/frame/useFrameContent";
import { useMouseEvents } from "../visual-constructor/src/hooks/frame/useMouseEvents";


/**
* This is a frame element used in the visual constructor modal window, allowing users to manually choose parsing content.
*
* @since 1.0.0
* @param {Function} onReady - Callback function to execute when the frame is ready.
* @returns {JSX.Element} Returns the frame element with an iFrame tag containing the visual constructor.
*/

export const Frame = ({ onReady,html,url }) => {
  const frameRef = useRef(null),
    [frame, setFrame] = useState(null),
    [getTitle, getFeaturedMedia, selectElement, removeElement] = useFrameContent(frameRef.current),
    [mouseOver, mouseOut] = useMouseEvents();
  useEffect(() => {
    if (html && frameRef.current) {
      initFrame(html,frameRef);
    }
    return () => {
      if (frame !== null) {
        frame.shutDown();
      }
    };
  }, [html]);

  const initFrame = (html,frameRef) => {
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
        getFeaturedMedia,
        onReady,
      ]);
    setFrame(newFrame);
  },
    clickHandler = (event) => {
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

  return (
    <iframe id="visual-constructor" frameBorder="0" ref={frameRef}>
      {' '}
    </iframe>
  );
}
