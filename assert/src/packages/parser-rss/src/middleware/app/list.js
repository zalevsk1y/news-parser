import {LIST,PARSE} from '../../constants';
import {API_SUCCESS,apiRequest} from '../../actions/api.actions';
import {showMessage} from '../../actions/index'
import {FETCH_LIST, setList} from '../../actions/list.actions';

export const listMiddleware = ({dispatch})=>next=>action=>{
    next (action);
    switch(action.type){
        case FETCH_LIST:
            const {url}=action.payload;
            dispatch(apiRequest(LIST,PARSE,{url,entity:LIST}));
            break;
        case `[${LIST}:${PARSE}]${API_SUCCESS}`:
                debugger;
            const posts=action.payload.data.map((post,index)=>{
                post._id=parseInt(index);
                return post;
            })
            action.payload.msg&&dispatch(showMessage(action.payload.msg.type,action.payload.msg.text))
            dispatch(setList(posts))
    }
}