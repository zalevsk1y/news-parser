import React, { useCallback } from "react";

export const SelectGroup = ({children,className,ariaLabel,onSelect,placeholder}) => {
    const [selectValue,setSelectValue]=React.useState(''); 
    const selectClickHandler=useCallback(()=>{
        onSelect(selectValue);
    },[selectValue]);
    const selectChangeHandler=useCallback((e)=>{
        e.preventDefault();
        setSelectValue(e.target.value);
    },[])
    return (
        <>
            <select className={className} aria-label={ariaLabel} onChange={selectChangeHandler} value={selectValue}>
                <option value="" disabled>{placeholder}</option>
                {children}
            </select>
            <button className="btn btn-primary" type="button" onClick={selectClickHandler}>Select</button>
        </>
    )
}