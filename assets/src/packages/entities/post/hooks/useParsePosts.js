import { useSelector } from "react-redux";
import {table} from "@news-parser/helpers/classes/Table";
import { useCallback, useState } from "react";

export const useParsePosts = () => {
    const [isAllParsing,setIsAllParsing]=useState(false);
    const [isPostParsing,startPostParsing]=useParsePost();
    const startParsing=useCallback((selectedPosts)=>{
        setIsAllParsing(true);
        let requestPromise=selectedPosts.map(post=>startPostParsing(post.url,post._id,data));
        Promise.allSettled(requestPromise).then(setIsAllParsing(false))
    });
    return [isAllParsing,startParsing]
}
            
