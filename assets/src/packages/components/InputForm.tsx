import React, { useCallback, useState } from 'react';
import './styles/InputForm.css';

export interface InputFormProps {
  buttonName: string;
  submitAction: (value: string) => void;
  initValue?: string;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

/**
 * A component that displays an input box and a submit button with optional loading and disabled states.
 *
 * @param {InputFormProps} props - The component props.
 * @param {string} buttonName - The text to display on the submit button.
 * @param {function} submitAction - A callback function that will be called when the submit button is clicked, and passed the input value as a string argument.
 * @param {string} [initValue=''] - The initial value of the input box.
 * @param {boolean} [disabled=false] - A flag that indicates whether the submit button should be disabled.
 * @param {boolean} [isLoading=false] - A flag that indicates whether the submit button should show a loading spinner.
 * @param {string} [className=''] - A CSS class name to apply to the input box.
 * @returns {JSX.Element} A div element containing an input box and a submit button.
 */


export const InputForm: React.FC<InputFormProps> = ({ buttonName, submitAction, initValue, disabled, isLoading, className }) => {
  const [inputValue, setInputValue] = useState(initValue || '');
  const inputChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);
  const submitClickHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    submitAction(inputValue);
  }, [submitAction, inputValue]);

  return (
    <div className='search container'>
      <div className='center'>
        <div className='input-wrapper'>
          <input
            className={`search-textbox col-12 col-sm-8 ${className || ''}`}
            type='url'
            minLength={10}
            required
            name='url'
            placeholder='https://'
            value={inputValue}
            disabled={disabled}
            onChange={inputChange}
            aria-label='Rss URL Input'
            aria-required='true'
            id='rss-url-input-form'
          />
          <button
            disabled={disabled}
            className='np-fs-16 btn btn-outline-secondary align-baseline main-input-button'
            type='button'
            onClick={submitClickHandler}
            aria-busy={isLoading ? 'true' : 'false'}
          >
            {isLoading ? (
              <>
                <span
                  className='spinner-border spinner-border-16 np-fs-16'
                  role='status'
                  aria-label={isLoading ? 'Loading...' : buttonName}
                  aria-hidden={isLoading ? 'false' : 'true'}
                />
                <span
                  className='sr-only np-fs-16'
                  aria-hidden={isLoading ? 'false' : 'true'}
                >&nbsp;Loading...</span>
              </>
            ) : buttonName
            }
          </button>
        </div>
      </div>
    </div>
  );
};

