import {LIST,PARSE} from '../../constants';
import {API_SUCCESS,apiRequest} from '../../actions/api.actions';
import {showMessage} from '../../actions/index'
import {FETCH_LIST, setList} from '../../actions/list.actions';
import {setAppState} from '../../actions/app.actions';

export const listMiddleware = ({dispatch})=>next=>action=>{
    next (action);
    switch(action.type){
        case FETCH_LIST:
            const {url}=action.payload;
            dispatch(setAppState(LIST,PARSE,{url}));
            dispatch(apiRequest(LIST,PARSE,{url,entity:LIST}));
            break;
        case `[${LIST}:${PARSE}]${API_SUCCESS}`:
            const posts=action.payload.data.map((post,index)=>{
                post._id=parseInt(index);
                return post;
            }),
            {msg}=action.payload.data;
            dispatch(setList(posts));
            msg&&dispatch(showMessage(msg.type,msg.text));
            break;
    }
}