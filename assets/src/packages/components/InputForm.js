import React, { useCallback, useState } from 'react';


/**
 * Input element with submit buttons.
 * 
 * @since 0.8.0
 */

export const InputForm = ({ buttonName, submitAction, initValue, disabled,isLoading,className }) => {
    const [inputValue, setInputValue] = useState(initValue || "");
    const inputChange = (event) => {
        setInputValue(event.target.value);
    };
    const submitClickHandler = useCallback(() => {
        submitAction(inputValue);
    }, [inputValue]);
    return (
        <div className="search container">
            <div className="center">
                <div className="input-wrapper">
                    <input
                        className={`search-textbox col-12 col-sm-8 ${className?className:""}`}
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
                        className="np-fs-16 btn btn-outline-secondary align-baseline main-input-button"
                        type="button"
                        onClick={submitClickHandler}
                    >
                        {isLoading?<><span className="spinner-border spinner-border-16 np-fs-16" role="status" aria-hidden="true"></span>
                        <span className="sr-only np-fs-16">&nbsp;Loading...</span></>
                        :buttonName}
                    </button>
                </div>
            </div>
        </div>
    );
};
