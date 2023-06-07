import { useState } from "react"
import { requestApi } from "@news-parser/helpers/api/requestApi";
import { PAGE,PARSE } from "@news-parser/config/constants";
import { useDispatch } from "react-redux";
import { insertDraftPost, togglePostSelect } from "../actions/post.actions";


export const useParsePost = () => {
    const [isPrsing,setIsParsing]=useState(false);
    const requestOptions={entity:PAGE,event:PARSE,data:null};
    const dispatch=useDispatch();
    const error=(entity,event,errorData)=>{
        const {msg}=errorData;
        console.error(msg.text);
        return errorData
    };
    const success=(entity,event,response)=>{
        const {_id}=response.date;
        dispatch(togglePostSelect(_id));
        dispatch(insertDraftPost(_id,parsedPostData));
        return response
    };
    //  { url, _id, data }
    const parsePost=(postData)=>{
        setIsParsing(true);
        requestOptions.data={postData};
        return requestApi(requestOptions,success,error).then(respData=>{
            setIsParsing(false)
            return respData;
        })
    }
    return [isPrsing,parsePost]
}
            
