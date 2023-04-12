import { TEMPLATE,GET,POST,PATCH,SET,DELETE,API } from "../constants";
export const GET_TEMPLATE=`[${TEMPLATE}:${GET}]${TEMPLATE}/${API}`,
    CREATE_TEMPLATE=`[${TEMPLATE}:${POST}]${TEMPLATE}/${API}`,
    UPDATE_TEMPLATE=`[${TEMPLATE}:${PATCH}]${TEMPLATE}/${API}`,
    SET_TEMPLATE=`[${TEMPLATE}:${SET}]`,
    DELETE_TEMPLATE=`[${TEMPLATE}:${DELETE}]${TEMPLATE}/${API}`;


export const getTemplate=url=>(
    {
        type:GET_TEMPLATE,
        payload:{
            url
        }
    }
)

export const createTemplate=(url,template)=>(
    {
        type:CREATE_TEMPLATE,
        payload:{
            url,
            template
        }
    }
)

export const updateTemplate=(url,template)=>(
    {
        type:UPDATE_TEMPLATE,
        payload:{
            url,
            template
        }
    }
)
    
export const setTemplate=template=>(
    {
        type:SET_TEMPLATE,
        payload:{
            template
        }
    }
)

export const deleteTemplate=template=>(
    {
        type:DELETE_TEMPLATE,
        payload:{
            template
        }
    }
)