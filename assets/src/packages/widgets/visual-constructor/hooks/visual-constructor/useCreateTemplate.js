import { useState } from "react"
import { requestApi } from "@news-parser/helpers/api/requestApi";
import { TEMPLATE,CREATE } from "@news-parser/config/constants";
import {formatCreateTemplateRequest} from '@news-parser/helpers/response-formatters/TemplateModel';
import { useSelector } from "react-redux";

export const useCreateTemplate=()=>{
    const [isFetching,setIsFetching]=useState(false);
    const {url,parsedData,options}=useSelector(state=>({
        parsedData:state.parse.sidebarTemplate.parsedData,
        url:state.parse.dialog.dialogData.url,
        options:{
            postOptions:state.parse.sidebar,
            extraOptions:state.parse.sidebarTemplate.options
        }
    }));
    const requestOptions={entity:TEMPLATE,event:CREATE,data:null};
    const error=(entity,event,errorData)=>{
        const {msg}=errorData;
        console.error(msg.text);
    };
    const success=(entity,event,template)=>{
        return template;
    };
    const createTemplate=()=>{
        setIsFetching(true);
        const template=formatCreateTemplateRequest(parsedData,options,url);
        requestOptions.data={template};
        return requestApi(requestOptions,success,error).then(()=>setIsFetching(false))
    }
    return [isFetching,createTemplate]
}