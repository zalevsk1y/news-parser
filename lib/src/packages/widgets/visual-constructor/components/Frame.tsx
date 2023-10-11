import React, { useRef, useEffect } from 'react';

import { useFetchHTML } from '../hooks';
import { useShowMessage } from '@news-parser/entities/message/hooks/index';
import { useClose } from '../hooks/visual-constructor/useClose';
import { useAddHTMLCache } from '../hooks/visual-constructor/useAddHTMLCache';
import { useFrameElement } from '../hooks/frame/useFrameElement';

interface FrameProps {
  isOpen: boolean,
  url: string | false,
  onReady: () => void,

}

/**
* This is a frame element used in the visual constructor modal window, allowing users to manually choose parsing content.
*
* @since 1.0.0
* 
* @param {string} url - Url of the page that is currently currently loaded to frame.
* @param {Boolean} isOpen - Is Frame is open.
* @param {Function} onReady - Callback function to execute when the frame is ready.
* @returns {JSX.Element} Returns the frame element with an iFrame tag containing the visual constructor.
*/

export const Frame: React.FC<FrameProps> = ({ isOpen, url, onReady }) => {

  const frameElementRef = useRef<HTMLIFrameElement>(null);
  const [isFetching, abortFetching, startHTMLFetching] = useFetchHTML();
  const showMessage = useShowMessage();
  const closeVisualConstructor = useClose();
  const addHTMLCache = useAddHTMLCache();
  const frame = useFrameElement(frameElementRef.current, url);

  useEffect(() => {
    if (url) {
      startHTMLFetching(url)
        .then(resp => {
          addHTMLCache(url, resp.data.html)
          if (isOpen) {
            if (frame !== null) frame.init(resp.data.html);
            if (frame !== null) frame.onReady(onReady)
          }
        })
        .catch(error => {
          if (isOpen) {
           if(error.message!=='The user aborted a request.'){
            closeVisualConstructor();
            showMessage('error', error.message)
           }
          }
        });
    }
  }, [url, frame]);
  useEffect(()=>{
    if(!isOpen&&isFetching){
      abortFetching();
    }
    if (isOpen === true && frame !== null) {
      frame.shutDown();
    }
  },[isOpen])
  return (
    <iframe id='visual-constructor' tabIndex={-1} ref={frameElementRef}>
      {' '}
    </iframe>
  );
}


export default Frame;