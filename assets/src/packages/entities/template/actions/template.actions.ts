import { TemplateDataWithPostOptions } from 'types/template';
import { SetAction } from '@news-parser/types';
import { TEMPLATE,GET,POST,PATCH,SET,DELETE,API } from '../constants';

export const GET_TEMPLATE=`[${TEMPLATE}:${GET}]${TEMPLATE}/${API}`;
    export const CREATE_TEMPLATE=`[${TEMPLATE}:${POST}]${TEMPLATE}/${API}`;
    export const UPDATE_TEMPLATE=`[${TEMPLATE}:${PATCH}]${TEMPLATE}/${API}`;
    export const SET_TEMPLATE=`[${TEMPLATE}:${SET}]`;
    export const DELETE_TEMPLATE=`[${TEMPLATE}:${DELETE}]${TEMPLATE}/${API}`;


export const getTemplate:SetAction<string>=url=>(
    {
        type:GET_TEMPLATE,
        payload:url
    }
)

export const createTemplate:SetAction<{url:string,template:TemplateDataWithPostOptions}>=(templateData)=>(
    {
        type:CREATE_TEMPLATE,
        payload:templateData
    }
)

export const updateTemplate:SetAction<{url:string,template:TemplateDataWithPostOptions}>=(templateData)=>(
    {
        type:UPDATE_TEMPLATE,
        payload:templateData
    }
)
    
export const setTemplate:SetAction<TemplateDataWithPostOptions>=(template)=>(
    {
        type:SET_TEMPLATE,
        payload:template
        
    }
)

export const deleteTemplate:SetAction<TemplateDataWithPostOptions>=(template)=>(
    {
        type:DELETE_TEMPLATE,
        payload:template
        
    }
)