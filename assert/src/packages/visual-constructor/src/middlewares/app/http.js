import {HTML,PARSE} from '@news-parser/parser-rss/constants';
import {API_SUCCESS,API_SUCCESS,apiRequest} from '@news-parser/parser-rss/actions/api.actions';
import {dialogFetching} from '../../actions/api.actions';
import {FETCH_HTML} from '../../actions'
import {setHTML} from '../../actions/set.actions';
import {decodeHTMLEntities} from '@news-parser/helpers';

export const htmlMiddleware = ({dispatch})=>next=>action=>{
    next (action);
    switch(action.type){
        case FETCH_HTML:
            const {data}=action.payload;
            dispatch(dialogFetching(true))
            dispatch(apiRequest(HTML,PARSE,data));
            break;
        case `[${HTML}:${PARSE}]${API_SUCCESS}`:
            dispatch(dialogFetching(false))
            const decodedHTML=decodeHTMLEntities(action.payload.data)
            dispatch(setHTML(decodedHTML))
    }
}