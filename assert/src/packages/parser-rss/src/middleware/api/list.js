import {LIST,PARSE} from '../../constants';
import {API_SUCCESS,apiRequest} from '../../actions/api.actions';
import {showMessage} from '../../actions/app.actions'
import {FETCH_LIST, setList} from '../../actions/list.actions';
import {setAppState} from '../../actions/app.actions';

export const listMiddleware = ({dispatch})=>next=>action=>{
    next (action);
    switch(action.type){
        case FETCH_LIST:
            const {url}=action.payload;
            dispatch(setAppState(LIST,PARSE,{url}));
            dispatch(apiRequest(LIST,PARSE,{url}));
            break;
        case `[${LIST}:${PARSE}]${API_SUCCESS}`:
            const {msg,data}=action.payload.response,
                posts=data.map((post,index)=>{
                post._id=parseInt(index);
                return post;
            });
            dispatch(setList(posts));
            msg&&dispatch(showMessage(msg.type,msg.text));
            break;
    }
}