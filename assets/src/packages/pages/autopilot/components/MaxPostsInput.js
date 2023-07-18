import React, { useCallback, useEffect, useState } from "react";
import { useMaxPosts } from "@news-parser/entities/cronOptions/hooks/useMaxPosts";

export const MaxPostsInput = (props) => {
    const [maxPosts, setMaxPosts] = useMaxPosts();
    const [inputState,setInputState]=useState(maxPosts||'');
    const setMaxPostsHandler=useCallback(()=>setMaxPosts(inputState),[inputState]);
    const inputStateChangeHandler=useCallback((e)=>setInputState(e.target.value),[setInputState]);
    useEffect(() => {
        if (maxPosts !== undefined) {
            setInputState(maxPosts);
        }
    }, [maxPosts]);
    return <input type="number" {...props} onBlur={setMaxPostsHandler} onChange={inputStateChangeHandler} value={inputState} />
}