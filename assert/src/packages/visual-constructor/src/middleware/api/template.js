
import {API_SUCCESS,apiRequest} from '@news-parser/parser-rss/actions/api.actions';

import {showMessage} from '@news-parser/message/';
import {CREATE_PARSING_TEMPLATE} from '../../actions/template.actions';
import {formatCreateTemplateRequest} from '@news-parser/helpers/classes/TemplateModel';
import { VISUAL_CONSTRUCTOR,TEMPLATE,CREATE } from '../../constants/';

export const templateMiddleware = (store)=>next=>action=>{
    next (action);
    const {getState,dispatch}=store;
    switch(action.type){
        case CREATE_PARSING_TEMPLATE:
            const {options,dialogData,parsedData}=getState().parse.dialog.visualConstructor,
                requestData=formatCreateTemplateRequest(parsedData,options,dialogData.url)
            dispatch(apiRequest(TEMPLATE,CREATE,requestData));
            break;
        case `[${TEMPLATE}:${CREATE}]${API_SUCCESS}`:
            const {msg}=action.payload.response;
            dispatch(showMessage(msg.text,msg.text));
    }
}