import React, { useEffect, useState, useMemo,useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { decodeHTMLEntities } from '@news-parser/helpers/index';
import { ParserRootState } from 'types/state';

/**
 * Message window element.
 *
 * @since 0.8.0
 */

export const Message: React.FC = () => {
  const [isOpen, setMessageWindowState] = useState<boolean>(false);

  const messageData = useSelector((state: ParserRootState) => state.parse.message);

  const closeButtonRef=useRef<HTMLButtonElement>(null);
  
  const close = useCallback(() => setMessageWindowState(false),[]);
  const open = () => {
    setMessageWindowState(true);
    if(closeButtonRef.current!==null) closeButtonRef.current.focus();
  }
  const decodedMessageText = useMemo(() => {
    if (messageData === false) return '';
    return messageData.text ? decodeHTMLEntities(messageData.text) : '';
  }, [messageData]);

  // If get mew message close current message and open new one in 400ms.
  useEffect(() => {
    if (messageData === false) return;
    if (isOpen) {
      setTimeout(() => {
        close();
        setTimeout(open, 400)
      }, 2000);
    } else {
      open()
    }
  }, [messageData]);

  const infoIcon = {
    'success': 'bi-check-circle-fill',
    'error': 'bi-exclamation-octagon-fill',
    'info': 'bi-info-circle-fill'
  };
  if (messageData === false) return null;
  return (
    <div className="message-wrapper">
      <div
        className={`alert alert-${messageData.type} alert-dismissible fade ${isOpen ? 'show' : ''}`}
        role="alert"
        aria-live="assertive"
        aria-hidden={!isOpen}
        aria-atomic="true"
      >
        <i className={infoIcon[messageData.type]} aria-label={`alert ${messageData.type} sign`} />

        <span className="mx-3" aria-label="Message text">
          {decodedMessageText}
        </span>
        <button
          tabIndex={0}
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={close}
          ref={closeButtonRef}
        />
      </div>
    </div>

  );
};

