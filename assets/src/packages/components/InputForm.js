import React, { useCallback, useState } from 'react';


/**
 * Input element with submit buttons.
 * 
 * @since 0.8.0
 */

export const InputForm = ({ buttonName, submitAction, initValue, disabled,isLoading }) => {
    const [inputValue, setInputValue] = useState(initValue || "");
    const inputChange = (event) => {
        setInputValue(event.target.value);
    };
    const submitClickHandler = useCallback(() => {
        submitAction(inputValue);
    }, [inputValue]);
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
                        className="btn btn-outline-secondary ms-2 h-100 align-baseline"
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
