import React, { useCallback } from 'react';
import '../styles/TagInput.css';

export interface TagInputProps {
  onCreate: (tagName: string) => void;
  id?: string;
  bottomCapture:string,
  labelText:string,
  children: React.ReactNode;
}

/**
*
* React component for a tag input field.
* @param {TagInputProps} props - The props object for the TagInput component.
* @param {function} props.onCreate - A function to be called when a new tag is created.
* @param {string} [props.id] - An optional suffix to append to the input element's ID.
* @param {string} [props.bottomCapture] - An  string to display below the input field.
* @param {string} [props.labelText] - An optional label for the input field.
* @param {ReactNode} [props.children] - Any child elements to be rendered within the input container.
* @returns {JSX.Element} A JSX element representing the TagInput component.
*/

export const TagInput:React.FC<TagInputProps> = ({ onCreate, id: idSufix, bottomCapture, labelText, children }) => {
  const sanitizeTag = (tagName:string):string => tagName.replace(',', '').trim();
  const inputKeyPressHandler:React.KeyboardEventHandler<HTMLInputElement> = useCallback((event) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      const targetElement=event.target as HTMLInputElement;
      const tagName = targetElement.value;
      targetElement.value = '';
      tagName !== '' && onCreate(sanitizeTag(tagName));
    }
  }, [onCreate]);
  const inputId:string = `tag-input${idSufix ? `-${  idSufix}` : ''}`;
  return (
    <div className="tag-item-container">
      <label htmlFor={inputId}>{labelText}</label>
      <div className="tag-input-container input-container" role="combobox" aria-haspopup="false" aria-expanded="false">
        {children}
        <input type="text" onKeyDown={inputKeyPressHandler} id={inputId} role="textbox" aria-autocomplete="list" />
      </div>
      <i>{bottomCapture}</i>
    </div>
  );
};

