import React from 'react';
import './styles/TagItem';

export interface TagItemProps {
  tagName: string;
  removeTagHandler: React.MouseEventHandler<HTMLButtonElement>;
}

/**
*
* A component that represents a tag item in a list of tags.
* @param {Object} props - The props object.
* @param {string} props.tagName - The name of the tag.
* @param {function} props.removeTagHandler - The callback function to remove the tag.
* @returns {JSX.Element} A JSX element representing the tag item.
*/

export const TagItem: React.FC<TagItemProps> = ({ tagName, removeTagHandler }) => (
    <span className='tag-item-token' key={`tag-${tagName}`}>
      <span className='tag-item-name'>{tagName}</span>
      <button className='tag-close-btn' onClick={removeTagHandler} >
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' aria-hidden='true' focusable='false'><path d='M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z' /></svg>
      </button>
    </span>
  )