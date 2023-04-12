import React, { useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { decodeHTMLEntities } from "@news-parser/helpers/";
/**
 * Message window element.
 *
 * @since 0.8.0
 */

export const Message = () => {
  const [isOpen, setMessageWindowState] = useState(false);
  const [msgState,setMsgState]=useState({type:'info',text:'no info'});
  const { type, text, timestamp } = useSelector((state) => state.parse.message);
  const close = () => setMessageWindowState(false);
  let decodedText = text ? decodeHTMLEntities(text) : "",
    open=()=>{
      setMsgState({type,text:decodedText,timestamp});
      setMessageWindowState(true)
    };
  //If get mew message close current message and open new one in 400ms.
  useLayoutEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        close();
        setTimeout(open,400)
      }, 2000);
    } else if (timestamp !== undefined) {
      open()
    }
  }, [timestamp]);
  const infoIcon = {
    "success":"bi-check-circle-fill",
    "error":"bi-exclamation-octagon-fill",
    "info":"bi-info-circle-fill"
    };
  return (
    <div className="message-wrapper">
      <div
        className={`alert alert-${msgState.type} alert-dismissible fade ${
          isOpen ? "show" : ""
        }`}
      >
        <i className={infoIcon[msgState.type]}></i>

        <span className="mx-3">{msgState.text}</span>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          onClick={close}
        ></button>
      </div>
    </div>
  );
};

