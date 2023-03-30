import { useSelector } from "react-redux";
import {table} from "@news-parser/helpers/classes/Table";
import { useParsePost } from "./useParsePost";
import { requestApi } from "@news-parser/helpers/api/requestApi";
import { PAGE,PARSE } from "@news-parser/config/constants";
import {useSelectPost,useDraftPost} from '@news-parser/entyties/post';


export const useParsePosts = () => {
    const [selectPost,deselectPost]=useSelectPost();
    const insertPostDraft=useDraftPost();
    const [isParsing,setIsParsing]=useState(false);
    const parsePost = (url,_id) => {
        const requestOptions={entity:PAGE,event:PARSE,data:{url,_id}};
        const error=(entity,event,errorData)=>{
            const {msg}=errorData;
            console.error(msg.text);
        };
        const success=(entity,event,parsedPostData)=>{
            const {post_id,_id,editLink}=parsedPostData.data;
            const {msg}=parsedPostData;
            deselectPost(_id);
            insertPostDraft(_id,post_id,editLink)
        };  
        return requestApi(requestOptions,success,error)
    };
    const startParsing = (selectedPosts)=>{
            setIsParsing(true);
            const requestPromises=[];
            for (var i = 0, end = selectedPosts.length; i < end; i++) {
                const  url = selectedPosts[i].link;
                const _id = selectedPosts[i]._id;
                requestPromise.push(parsePost(url,_id);
            }
            return Promise.allSettled(requestPromises).then(()=>setIsParsing(false))
        }
        return [isParsing,startParsing] 
}
    

            
