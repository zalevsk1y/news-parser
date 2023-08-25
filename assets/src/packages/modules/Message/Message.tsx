import React, { useLayoutEffect, useState,useMemo } from 'react';
import { useSelector } from 'react-redux';
import { decodeHTMLEntities } from '@news-parser/helpers/index';
import { ParserRootState } from 'types/state';
import { MessageAction } from 'types/message';
/**
 * Message window element.
 *
 * @since 0.8.0
 */

export const Message: React.FC = () => {
  const [isOpen, setMessageWindowState] = useState<boolean>(false);
  const [msgState, setMsgState] = useState<MessageAction>({ type: 'info', text: 'no info' });
  const messageData = useSelector((state: ParserRootState) => state.parse.message);

  const close = () => setMessageWindowState(false);
  
    const decodedText = useMemo(()=>{
      if(messageData===false) return '';
      return messageData.text ? decodeHTMLEntities(messageData.text) : '';
    },[messageData])
      const open = () => {
        if(messageData!==false){
          setMsgState({ type:messageData.type, text: decodedText});
          setMessageWindowState(true);
        }
      };
    // If get mew message close current message and open new one in 400ms.
    useLayoutEffect(() => {
      if (isOpen) {
        setTimeout(() => {
          close();
          setTimeout(open, 400)
        }, 2000);
      } else if (messageData !== false&&messageData.timestamp!==undefined) {
        open()
      }
    }, [messageData]);
  
  const infoIcon = {
    'success': 'bi-check-circle-fill',
    'error': 'bi-exclamation-octagon-fill',
    'info': 'bi-info-circle-fill'
  };
  return (
    <div className='message-wrapper'>
      <div
        className={`alert alert-${msgState.type} alert-dismissible fade ${isOpen ? 'show' : ''
          }`}
      >
        <i className={infoIcon[msgState.type]} />

        <span className='mx-3'>{msgState.text}</span>
        <button
          type='button'
          className='btn-close'
          data-bs-dismiss='alert'
          onClick={close}
         />
      </div>
    </div>
  );
};

