import {TEMPLATE,CREATE} from '@news-parser/parser-rss/constants';
import {API_SUCCESS,API_SUCCESS,apiRequest} from '@news-parser/parser-rss/actions/api.actions';

import {showMessage} from '@news-parser/parser-rss/actions/';
import {TEMPLATE_CREATE} from '../../actions';

export const templateMiddleware = ({dispatch})=>next=>action=>{
    next (action);
    switch(action.type){
        case TEMPLATE_CREATE:
            const {data}=action.payload;
            dispatch(apiRequest(TEMPLATE,CREATE,data));
            break;
        case `[${TEMPLATE}:${CREATE}]${API_SUCCESS}`:
            dispatch(showMessage('success',data.msg.text));
    }
}