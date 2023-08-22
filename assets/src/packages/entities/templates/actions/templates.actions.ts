import { SetAction } from '@news-parser/types';
import {TEMPLATES,SET} from '../constants';

export const SET_TEMPLATES=`[${TEMPLATES}:${SET}]`;


export const setTemplates:SetAction<Array<string>>=(templates)=>({
        type:SET_TEMPLATES,
        payload:templates
    })