import {TEMPLATES,SET} from '../constants';
export const SET_TEMPLATES=`[${TEMPLATES}:${SET}]`;


export const setTemplates=(templates)=>{
    return {
        type:SET_TEMPLATES,
        payload:{
            templates
        }
    }
}