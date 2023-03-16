import { useDispatch, useSelector } from "react-redux";
import {createTemplate} from "@news-parser/template/actions"
import { useCallback } from "react";

export const useCreateParsingTemplate=()=>{
    const dispatch = useDispatch(),
        url=useSelector(state=>state.parse.dialog.visualConstructor.dialogData.url),
        //Rewrite accordin new template API specifications
        template=useSelector(state=>({template:state.parse.dialog.visualConstructor.parseTemplate,options:state.parse.dialog.visualConstructor.options, postOptions:state.parse.sidebar})),
        createParsingTemplateCallback=useCallback(()=>dispatch(createTemplate(url,template)),[url,template]);
    return [createParsingTemplateCallback]
}