import { Action } from '@news-parser/types';
import { TemplateDataWithPostOptions } from 'types/template';
import {SET_TEMPLATE,DELETE_TEMPLATE} from '../actions/template.actions'

export const template=(state:TemplateDataWithPostOptions|false=false,action:Action)=>{
    switch (action.type){
        case SET_TEMPLATE:
            return action.payload;
        case DELETE_TEMPLATE: 
            return false; 
        default:
            return state;      
    }
}