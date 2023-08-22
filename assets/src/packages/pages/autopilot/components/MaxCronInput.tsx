import React, { HTMLProps, useCallback, useEffect, useState } from "react";
import { useMaxCronCalls } from "@news-parser/entities/cronOptions/hooks/useMaxCronCalls";

export const MaxCronInput:React.FC<HTMLProps<HTMLInputElement>> = (props) => {
    const [maxCronCalls, setMaxCronCalls] = useMaxCronCalls();
    const [inputValue,setInputValue]=useState<string>(maxCronCalls.toString());
    const setMaxCronHandler=useCallback(()=>setMaxCronCalls(parseInt(inputValue)),[inputValue]);
    const inputStateChangeHandler=useCallback((e:React.ChangeEvent<HTMLInputElement>)=>setInputValue(e.target.value),[setInputValue]);
    useEffect(() => {
        if (maxCronCalls !== undefined) {
            setInputValue(maxCronCalls.toString());
        }
    }, [maxCronCalls]);
    return <input type="number" {...props} onBlur={setMaxCronHandler} onChange={inputStateChangeHandler} value={inputValue} />
}