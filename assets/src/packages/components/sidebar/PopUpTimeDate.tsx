import React, { useState, useMemo, useCallback } from 'react';
import { PopUp } from '@news-parser/ui/sidebar/PopUp';
import '../styles/PopUpTimeDate';

export interface PopUpTimeDateProps {
  value: { date: string | false },
  // date format ISO 8601 - 2022-08-21T15:30
  onChange: (date: string | false) => void
}
/**
 * A component that displays a popup with a date and time picker to select a post publishing time.
 *
 * @param {PopUpTimeDateProps} props - The component props.
 * @param {object} value - An object containing the post publication time, or `false` if the post should be published immediately.
 * @param {string} value.date - A string representation of the publication date and time in ISO format (e.g. "2021-09-01T14:30").
 * @param {function} onChange - A callback function that will be called when the publication time is changed or reset.
 * @returns {JSX.Element} A div element containing a span element and a PopUp component with a date and time picker.
 */

export const PopUpTimeDate: React.FC<PopUpTimeDateProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [postDate, setPostDate] = useState<string | false>(value.date);
  const openPopUp = useCallback(() => setIsOpen(true), []);
  const postDateStr = useMemo(() => new Date(postDate !== false ? postDate : Date.now()).toLocaleString(), [postDate])
  const resetClickHandler: React.MouseEventHandler<HTMLInputElement> = useCallback(() => onChange(postDate), [onChange]);
  const submitClickHandler: React.MouseEventHandler<HTMLInputElement> = useCallback(() => onChange(postDate), [onChange, postDate]);
  const dateChangeHandle: React.ChangeEventHandler<HTMLInputElement> = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const targetElement = event.target as HTMLInputElement;
    setPostDate(targetElement.value)
  }, [setPostDate]);

  return (
    <div className='sidebar-publish-time-containar'>
      <span className='sidebar-publish-time-input' onClick={openPopUp}>
        {postDate === false ? 'Immediately' : postDateStr}
      </span>
      <PopUp isOpen={isOpen}>
        <form style={{ outline: 'none' }} >
          <input type='datetime-local' onChange={dateChangeHandle} value={postDate !== false ? postDate : ''} />
          <div className='pop-up-buttons-block'>
            <input type='button' className='pop-up-link' onClick={resetClickHandler} value='Reset' />
            <input type='button' className='pop-up-link' onClick={submitClickHandler} value='Submit' />
          </div>
        </form>
      </PopUp>
    </div>
  );
};


