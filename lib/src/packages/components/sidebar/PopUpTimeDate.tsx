import React, { useState, useMemo, useCallback } from 'react';
import { PopUp } from '@news-parser/ui/sidebar/PopUp';
import '../styles/PopUpTimeDate.css';

export type PopUpTimeDateProps= {
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
  const resetClickHandler: React.MouseEventHandler<HTMLInputElement> = useCallback(() =>{
    setPostDate(false);
    setIsOpen(false);
    onChange(false);
  }, [onChange,setPostDate]);
  const submitClickHandler: React.MouseEventHandler<HTMLInputElement> = useCallback(() =>{
      setIsOpen(false);
      onChange(postDate);
  }, [onChange, postDate]);
  const dateChangeHandle: React.ChangeEventHandler<HTMLInputElement> = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const targetElement = event.target as HTMLInputElement;
    setPostDate(targetElement.value)
  }, [setPostDate]);

  return (
    <div className='sidebar-publish-time-containar'>
      <a role="button" data-testid='post-publish-date' className='sidebar-publish-time-input' onClick={openPopUp}>
        {postDate === false ? 'Immediately' : postDateStr}
      </a>
      <PopUp isOpen={isOpen}>
        <form style={{ outline: 'none' }} >
          <label htmlFor='pop-up-time-date-input' className='visually-hidden'>Select Date and Time:</label>
          <input data-testid='datetime-local-input' type='datetime-local' id='pop-up-time-date-input' onChange={dateChangeHandle} value={postDate !== false ? postDate : ''} name='postDate'/>
          <div className='pop-up-buttons-block'>
            <label htmlFor='pop-up-time-date-button-submit'>Submit button</label>
            <input type='button' className='pop-up-link' onClick={resetClickHandler} id='pop-up-time-date-button-reset' role='reset' value='Reset' />
            <label htmlFor='pop-up-time-date-button-reset'>Reset button</label>
            <input type='button' className='pop-up-link' onClick={submitClickHandler} id='pop-up-time-date-button-submit' role='submit' value='Submit' />
          </div>
        </form>
      </PopUp>
    </div>
  );
};


