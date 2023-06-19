import { useState } from "react";
import { useParsePost } from "./useParsePost";

export const useParsePosts = () => {
    const parsePost=useParsePost();
    const [parsedPostsCounter,setParsedPostsCounter]=useState(false);
    const [isParsing,setIsParsing]=useState(false)
    const postsParser=(postsArray,mode)=>{
        setParsedPostsCounter(0);
        setIsParsing(true);
        const postArrLength=postsArray.length;
        let counter=0;
        switch(mode){
            case 'race':
                Promise.all(postsArray.map((post,index)=>parsePost(post.link,post._id).then(()=>{
                        counter++;
                        setParsedPostsCounter(counter)
                    }))).then(()=>setIsParsing(false));
                break;
            case 'sequence':
                const postsArrClone=postsArray.slice();
                const sequenceCallback=(post,postsArr)=>{
                    parsePost(post.link,post._id).then(()=>{
                        setParsedPostsCounter(postArrLength-postsArr.length);
                        if (postsArr.length>0) {
                            sequenceCallback(postsArr.shift(),postsArr);
                        } else {
                            setIsParsing(false)
                        }
                    })
                }
                sequenceCallback(postsArrClone.shift(),postsArrClone);
            break;
   }}
   return [parsedPostsCounter,isParsing,postsParser]
}
            
