import React, { useCallback, useEffect, useState,HTMLProps } from "react";
import { useMaxPosts } from "@news-parser/entities/cronOptions/hooks/useMaxPosts";

export const MaxPostsInput:React.FC<HTMLProps<HTMLInputElement>> = (props) => {
    const [maxPosts, setMaxPosts] = useMaxPosts();
    const [inputState,setInputState]=useState<number>(maxPosts!==undefined?maxPosts:0);
    console.log(inputState)
    const setMaxPostsHandler=useCallback(()=>setMaxPosts(inputState),[inputState]);
    const inputStateChangeHandler=useCallback((e:React.ChangeEvent<HTMLInputElement>)=>setInputState(parseInt(e.target.value)),[setInputState]);
    useEffect(() => {
        if (maxPosts !== undefined) {
            setInputState(maxPosts);
        }
    }, [maxPosts]);
    return <input type="number" {...props} onBlur={setMaxPostsHandler} onChange={inputStateChangeHandler} value={inputState} />
}