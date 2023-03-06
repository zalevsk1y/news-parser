import {OPEN_DIALOG,fetchHTML} from '../../actions/dialogData.actions';

export const dialogDataMiddleware=({dispatch})=>next=>action=>{
    next(action);
    switch (action.type){
        case OPEN_DIALOG:
            const {url}=action.payload;
            dispatch(fetchHTML(url));
            break;
            
    }

}