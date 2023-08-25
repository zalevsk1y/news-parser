import React, { HTMLProps, useCallback, useEffect, useState } from "react";
import { useMaxCronCalls } from "@news-parser/entities/cronOptions/hooks/useMaxCronCalls";

export const MaxCronInput:React.FC<HTMLProps<HTMLInputElement>> = (props) => {
    const [maxCronCalls, setMaxCronCalls] = useMaxCronCalls();
    const [inputValue,setInputValue]=useState<number>(maxCronCalls!==undefined?maxCronCalls:0);
    const setMaxCronHandler=useCallback(()=>setMaxCronCalls(inputValue),[inputValue]);
    const inputStateChangeHandler=useCallback((e:React.ChangeEvent<HTMLInputElement>)=>setInputValue(parseInt(e.target.value)),[setInputValue]);
    useEffect(() => {
        if (maxCronCalls !== undefined) {
            setInputValue(maxCronCalls);
        }
    }, [maxCronCalls]);
    return <input type="number" {...props} onBlur={setMaxCronHandler} onChange={inputStateChangeHandler} value={inputValue} />
}