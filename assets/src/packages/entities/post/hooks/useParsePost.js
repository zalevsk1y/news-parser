import { useState } from "react"
import { requestApi } from "@news-parser/helpers/api/requestApi";
import { PAGE,PARSE } from "@news-parser/config/constants";


export const useParsePost = () => {
    const [isPrsing,setIsParsing]=useState(false);
    const requestOptions={entity:PAGE,event:PARSE,data:null};
    const error=(entity,event,errorData)=>{
        const {msg}=errorData;
        console.error(msg.text);
    };
    const success=(entity,event,parsedPostData)=>{
        console.log(parsedPostData)
    };
    //  { url, _id, data }
    const parsePost=(postData)=>{
        setIsParsing(true);
        requestOptions.data={postData};
        return requestApi(requestOptions,success,error).then(()=>setIsParsing(false))
    }
    return [isPrsing,parsePost]
}
            
