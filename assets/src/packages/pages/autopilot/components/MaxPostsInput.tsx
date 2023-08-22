import React, { useCallback, useEffect, useState,HTMLProps } from "react";
import { useMaxPosts } from "@news-parser/entities/cronOptions/hooks/useMaxPosts";

export const MaxPostsInput:React.FC<HTMLProps<HTMLInputElement>> = (props) => {
    const [maxPosts, setMaxPosts] = useMaxPosts();
    const [inputState,setInputState]=useState(maxPosts.toString());
    const setMaxPostsHandler=useCallback(()=>setMaxPosts(parseInt(inputState)),[inputState]);
    const inputStateChangeHandler=useCallback((e:React.ChangeEvent<HTMLInputElement>)=>setInputState(e.target.value),[setInputState]);
    useEffect(() => {
        if (maxPosts !== undefined) {
            setInputState(maxPosts.toString());
        }
    }, [maxPosts]);
    return <input type="number" {...props} onBlur={setMaxPostsHandler} onChange={inputStateChangeHandler} value={inputState} />
}