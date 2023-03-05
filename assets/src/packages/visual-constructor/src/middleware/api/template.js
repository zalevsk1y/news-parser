
import {API_SUCCESS,apiRequest} from '@news-parser/parser-rss/actions/api.actions';
import {closeDialog} from '../../actions/dialog.data.actions';
import {showMessage} from '@news-parser/message/';
import {CREATE_PARSING_TEMPLATE} from '../../actions/template.actions';
import {formatCreateTemplateRequest} from '@news-parser/helpers/response-formatters/TemplateModel';
import { VISUAL_CONSTRUCTOR,TEMPLATE,CREATE } from '../../constants/';

export const templateMiddleware = ({getState,dispatch})=>next=>action=>{
    next (action);
    switch(action.type){
        case CREATE_PARSING_TEMPLATE:
            const {options,dialogData,parsedData}=getState().parse.dialog.visualConstructor,
                requestData=formatCreateTemplateRequest(parsedData,options,dialogData.url)
            dispatch(apiRequest(TEMPLATE,CREATE,requestData));
            break;
        case `[${TEMPLATE}:${CREATE}]${API_SUCCESS}`:
            const {msg}=action.payload.response;
            dispatch(closeDialog());
            dispatch(showMessage(msg.type,msg.text));
    }
}