import {PARSE} from '@news-parser/parser-rss/constants';
import {HTML} from '../../constants';
import {API_SUCCESS,apiRequest} from '@news-parser/parser-rss/actions/api.actions';
import {dialogFetching} from '../../actions/api.actions';
import {FETCH_HTML,setHTML} from '../../actions/html.actions'
import {decodeHTMLEntities} from '@news-parser/helpers';

export const htmlMiddleware = ({dispatch})=>next=>action=>{
    next (action);
    switch(action.type){
        case FETCH_HTML:
            const {data}=action.payload;
            dispatch(apiRequest(HTML,PARSE,data));
            break;
        case `[${HTML}:${PARSE}]${API_SUCCESS}`:
        
            dispatch(setHTML(action.payload.response))
    }
}