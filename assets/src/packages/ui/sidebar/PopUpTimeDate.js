import React, { useState, useRef, useEffect,useMemo } from 'react';
import { PopUp } from './PopUp';
//import '@news-parser/styles/sidebar/_popup-time-date.scss';

export const PopUpTimeDate = ({ date = false, onChange }) => {
  const [state, setState] = useState({ date, popUp: false });
  const modalWindowRef = useRef(null);
  const openPopUp = () => setState((prevState) => ({ ...prevState, popUp: true }));
  const closePopUp = () =>
    setState(
      (prevState) => ({ ...prevState, popUp: false }),
      () => onChange && onChange(state)
    );
  const postDate=useMemo(()=>new Date(state.date).toLocaleString(),[state.date])
  const buttonClickHandler = (event) => {
    switch (event.target.value) {
      case 'Reset':
        setState({ date:false, popUp: false });;
        break;
      default:
        break;
    }
  };

  const dateChangeHandle = (event) => setState((prevState) => ({ ...prevState, date: event.target.value }));


  const handleBlur = (event) => {
    const { currentTarget } = event;
    window.setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        closePopUp();
      }
    }, 100);
  };

  useEffect(() => {
    if (state.popUp === true && modalWindowRef.current !== null) {
      modalWindowRef.current.focus();
    }
  }, [state.popUp]);

  return (
    <div className='sidebar-publish-time-containar'>
      <span className='sidebar-publish-time-input' onClick={openPopUp}>
        {state.date === false ? 'Immediately' : postDate}
      </span>
      <PopUp open={state.popUp}>
        <form onBlur={handleBlur} style={{ outline: 'none' }} ref={modalWindowRef}>
          <input type='datetime-local' onChange={dateChangeHandle} value={state.date} />
          <div className='pop-up-buttons-block'>
            <input type='button' className='pop-up-link' onClick={buttonClickHandler} value='Reset' />
          </div>
        </form>
      </PopUp>
    </div>
  );
};


