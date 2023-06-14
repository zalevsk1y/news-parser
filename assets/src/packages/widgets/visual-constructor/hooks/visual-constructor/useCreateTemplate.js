import { useState } from "react"
import { requestApi } from "@news-parser/helpers/api/requestApi";
import { TEMPLATE,CREATE } from "@news-parser/config/constants";
import {formatCreateTemplateRequest} from '@news-parser/helpers/response-formatters/TemplateModelWithPostOptions';
import { useSelector } from "react-redux";

export const useCreateTemplate=()=>{
    const [isFetching,setIsFetching]=useState(false);
    const {url,parsedData,postOptions,extraOptions}=useSelector(state=>({
        parsedData:state.parse.sidebarTemplate.parsedData,
        url:state.parse.dialog.dialogData.url,
        postOptions:state.parse.sidebar,
        extraOptions:state.parse.sidebarTemplate.options
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
        const template=formatCreateTemplateRequest(parsedData,url,postOptions,extraOptions);
        console.log(template)
        requestOptions.data={template};
        return requestApi(requestOptions,success,error).then(()=>setIsFetching(false))
    }
    return [isFetching,createTemplate]
}