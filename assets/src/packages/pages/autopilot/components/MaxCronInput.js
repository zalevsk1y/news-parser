import React, { useCallback, useEffect, useState } from "react";
import { useMaxCronCalls } from "@news-parser/entities/cronOptions/hooks/useMaxCronCalls";

export const MaxCronInput = (props) => {
    const [maxCronCalls, setMaxCronCalls] = useMaxCronCalls();
    const [inputState,setInputState]=useState('');
    const setMaxCronHandler=useCallback(()=>setMaxCronCalls(inputState),[inputState]);
    const inputStateChangeHandler=useCallback((e)=>setInputState(e.target.value),[setInputState]);
    useEffect(() => {
        if (maxCronCalls !== undefined) {
            setInputState(maxCronCalls);
        }
    }, [maxCronCalls]);
    return <input type="number" {...props} onBlur={setMaxCronHandler} onChange={inputStateChangeHandler} value={inputState} />
}