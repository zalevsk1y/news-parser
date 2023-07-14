import { useState } from "react"
import { requestApi } from "@news-parser/helpers/api/requestApi";
import { TEMPLATE,CREATE } from "@news-parser/config/constants";
import {formatCreateTemplateRequest} from '@news-parser/helpers/response-formatters/TemplateModelWithPostOptions';
import { useSelector } from "react-redux";
import { useFetchTemplate } from "@news-parser/entities/template/hooks/";

export const useCreateTemplate=()=>{
    const [isFetching,setIsFetching]=useState(false);
    const [isTemplateFetching,fetchTemplate]=useFetchTemplate()
    const {parsedData,postOptions,extraOptions}=useSelector(state=>({
        parsedData:state.parse.sidebarTemplate.parsedData,
        postOptions:state.parse.sidebar,
        extraOptions:state.parse.sidebarTemplate.options
    }));
    const createTemplate=(rssUrl)=>{
        const requestOptions={entity:TEMPLATE,event:CREATE,data:null};
        const error=(entity,event,errorData)=>{
            const {msg}=errorData;
            console.error(msg.text);
        };
        const success=(entity,event,template)=>{
            fetchTemplate(rssUrl)
            return template;
        };
        setIsFetching(true);
        const template=formatCreateTemplateRequest(parsedData,rssUrl,postOptions,extraOptions);
        requestOptions.data={template};
        return requestApi(requestOptions,success,error).then(()=>setIsFetching(false))
    }
    return [isFetching,createTemplate]
}