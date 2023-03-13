import {PARSER_RSS_LIST,PARSE} from '@news-parser/config/constants';
import {apiRequest} from '@news-parser/request/actions/api.actions';
import {API_SUCCESS} from '@news-parser/request/constants';
import {showMessage} from '../../actions/app.actions'
import {FETCH_LIST, setList} from '../../actions/list.actions';
import {setAppState} from '../../actions/app.actions';
import {decodeHTMLEntities} from '@news-parser/helpers/';
import { getTemplate } from '../../../../template/src/actions';


export const listMiddleware = ({dispatch,getState})=>next=>action=>{
    next (action);
    switch(action.type){
        case FETCH_LIST:
            const {url}=action.payload;
            dispatch(setAppState(PARSER_RSS_LIST,PARSE,{url}));
            dispatch(apiRequest(PARSER_RSS_LIST,PARSE,{url}));
            break;
        case `[${PARSER_RSS_LIST}.${PARSE}:${API_SUCCESS}]`:
            const {msg,data}=action.payload.response,
                posts=data.map((post,index)=>{
                post._id=parseInt(index);
                post.description=decodeHTMLEntities(post.description);
                post.title=decodeHTMLEntities(post.title);
                return post;
            });
            dispatch(setList(posts));
            msg&&dispatch(showMessage(msg.type,msg.text));
            dispatch(getTemplate(getState().parse.appState.data.url) )
            break;
    }
}