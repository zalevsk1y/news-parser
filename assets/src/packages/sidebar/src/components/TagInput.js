import React from "react";
import "@news-parser/styles/sidebar/_tag-input.scss";
import { useRef } from "react";

const TagInput = ({ tags, onChange,id:idSufix,bottomCapture,labelText }) => {
    const renderTags = () => {
    if (tags.length==0) return null;
    return tags.map((item, i) => {
      const removeTagHandler = () => {
        removeTag(item);
      };
      return (
        <span className="tag-item-token" key={`tag-${item.name}`}>
          <span className="tag-item-name">{item.name}</span>
          <button className="tag-close-btn" onClick={removeTagHandler}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"></path></svg>
          </button>
        </span>
      );
    });
  };

  const removeTag = (tag) => {
    onChange(tag);
  };

  const addTag = (tag) => {
    onChange({ name: sanitizeTag(tag) });
  };

  const sanitizeTag = (tag) => {
    return tag.replace(",", "");
  };

  const inputKeyPressHandler = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const tag = event.target.value;
      event.target.value = "";
      tag !== "" && addTag(tag);
    }
  };
  
  const inputId = `tag-input${idSufix ? "-" + idSufix : ""}`;
  return (
    <div className="tag-item-container">
      <label htmlFor={inputId}>{labelText}</label>
      <div className="tag-input-container input-container">
        {renderTags()}
        <input type="text" onKeyDown={inputKeyPressHandler} id={inputId} />
      </div>
      <i>{bottomCapture}</i>
    </div>
  );
};

export default TagInput;
