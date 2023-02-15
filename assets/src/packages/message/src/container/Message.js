import React, { useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { decodeHTMLEntities } from "@news-parser/helpers/";
/**
 * Message window element.
 *
 * @since 0.8.0
 */

const Message = () => {
  const [isOpen, setMessageWindowState] = useState(false);
  const { type, text, timestamp } = useSelector((state) => state.parse.message);
  const close = () => setMessageWindowState(false);
  let decodedText = text ? decodeHTMLEntities(text) : "";
  //If get mew message close current message and open new one in 400ms.
  useLayoutEffect(() => {
    if (isOpen) {
      close();
      setTimeout(() => {
        setMessageWindowState(true);
      }, 400);
    } else if (timestamp !== undefined) {
      setMessageWindowState(true);
    }
  }, [timestamp]);
  const infoIcon = (type) => {
    switch (type) {
      case "success":
        return "bi-check-circle-fill";
      case "error":
        return "bi-exclamation-octagon-fill";
      case "info":
        return "bi-info-circle-fill";
    }
  };
  return (
    <div className="message-wrapper">
      <div
        className={`alert alert-${type} alert-dismissible fade ${
          isOpen ? "show" : ""
        }`}
      >
        <i className={infoIcon(type)}></i>

        <span className="mx-3">{decodedText}</span>
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

export default Message;