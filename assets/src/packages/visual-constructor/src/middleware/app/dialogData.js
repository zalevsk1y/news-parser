import { getTags } from '@news-parser/sidebar/actions/tag.actions';
import {OPEN_VISUAL_CONSTRUCTOR,fetchHTML} from '../../actions/dialogData.actions';

export const dialogDataMiddleware=({dispatch})=>next=>action=>{
    next(action);
    switch (action.type){
        case OPEN_VISUAL_CONSTRUCTOR:
            const {url}=action.payload;
            //dispatch(fetchHTML(url));
            //dispatch(getTags())
            break;
            
    }

}