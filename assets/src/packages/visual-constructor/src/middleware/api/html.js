import {PARSE} from '@news-parser/parser-rss/constants';
import {RAW_HTML} from '../../constants';
import {API_SUCCESS,apiRequest} from '@news-parser/parser-rss/actions/api.actions';
import {FETCH_HTML,setHTML} from '../../actions/dialogData.actions'


export const htmlMiddleware = ({dispatch})=>next=>action=>{
    next (action);
    switch(action.type){
        case FETCH_HTML:
            const {data}=action.payload;
            dispatch(apiRequest(`${RAW_HTML}`,PARSE,data));
            break;
        case `[${RAW_HTML}:${PARSE}]${API_SUCCESS}`:
            dispatch(setHTML(action.payload.response))
    }
}