import {OPEN_DIALOG} from '../../actions/app.actions';
import {fetchHTML} from '../../actions/html.actions'

export const dialogMiddleware=({dispatch})=>next=>action=>{
    next(action);
    switch (action.type){
        case OPEN_DIALOG:
            const {url}=action.payload;
            dispatch(fetchHTML(url));
            break;
            
    }

}