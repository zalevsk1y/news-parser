import React, { useCallback, useMemo } from "react";
//import "@news-parser/styles/sidebar/_tag-input.scss";

export const TagInput = ({ onCreate, id: idSufix, bottomCapture, labelText, children }) => {
  const sanitizeTag = (tagName) => {
    return tagName.replace(",", "").trim();
  };
  const inputKeyPressHandler = useCallback((event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const tagName = event.target.value;
      event.target.value = "";
      tagName !== "" && onCreate(sanitizeTag(tagName));
    }
  }, [onCreate]);
  const inputId = `tag-input${idSufix ? "-" + idSufix : ""}`;
  return (
    <div className="tag-item-container">
      <label htmlFor={inputId}>{labelText}</label>
      <div className="tag-input-container input-container">
        {children}
        <input type="text" onKeyDown={inputKeyPressHandler} id={inputId} />
      </div>
      <i>{bottomCapture}</i>
    </div>
  );
};

