import React, { useState, useMemo, useCallback } from 'react';
import { PopUp } from './PopUp';
//import '@news-parser/styles/sidebar/_popup-time-date.scss';

export const PopUpTimeDate = ({ value = false, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [postDate, setPostDate] = useState(() => {
    return value.date
  });
  const openPopUp = useCallback(() => setIsOpen(true), []);
  const postDateStr = useMemo(() => new Date(postDate).toLocaleString(), [postDate])
  const buttonClickHandler = useCallback((event) => {
    switch (event.target.value) {
      case 'Reset':
        onChange(false);
        break;
      case 'Submit':
        onChange(postDate)
        break;
    }
    setIsOpen(false)
  }, [postDate]);

  const dateChangeHandle = useCallback((event) => setPostDate(event.target.value), []);

  return (
    <div className='sidebar-publish-time-containar'>
      <span className='sidebar-publish-time-input' onClick={openPopUp}>
        {value.date === false ? 'Immediately' : postDateStr}
      </span>
      <PopUp open={isOpen}>
        <form style={{ outline: 'none' }} >
          <input type='datetime-local' onChange={dateChangeHandle} value={postDate} />
          <div className='pop-up-buttons-block'>
            <input type='button' className='pop-up-link' onClick={buttonClickHandler} value='Reset' />
            <input type='button' className='pop-up-link' onClick={buttonClickHandler} value='Submit' />
          </div>
        </form>
      </PopUp>
    </div>
  );
};


