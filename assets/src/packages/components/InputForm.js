import React, { useCallback, useState } from 'react';


/**
 * Input element with submit buttons.
 * 
 * @since 0.8.0
 */

export const InputForm = ({ buttonName, submitAction, initValue, disabled }) => {
    const [inputValue, setInputValue] = useState(initValue || "");
    const inputChange = (event) => {
        setInputValue(event.target.value);
    };
    const submitClickHandler = useCallback(() => submitAction(inputValue), [inputValue]);
    return (
        <div className="search container row">
            <div className="row center">
                <div className="input-wrapper">
                    <input
                        className="search-textbox"
                        type="url"
                        minLength={10}
                        required
                        name="url"
                        placeholder="https://"
                        value={inputValue}
                        onChange={inputChange}
                    ></input>
                    <button
                        disabled={disabled}
                        className="main-button parse-rss-button"
                        type="button"
                        onClick={submitClickHandler}
                    >
                        {buttonName}
                    </button>
                </div>
            </div>
        </div>
    );
};
