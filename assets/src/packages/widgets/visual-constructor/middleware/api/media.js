import { MEDIA,CREATE,WP_POST } from '../../constants/';
import { apiRequest } from '@news-parser/parser-rss/actions/api.actions';
import {formatCreateMediaData} from '@news-parser/helpers/response-formatters/formatCreateMediaData';

export const mediaMiddleware = ({dispatch,getState})=>next=>action=>{
    switch(action.type){
        case `[${WP_POST}:${CREATE}]API_SUCCESS`:
            const {parsedData,options}=getState().parse.dialog.visualConstructor,
                {title,id}=action.payload.response,
                requestMediaData=formatCreateMediaData(parsedData.image,title.raw,id);
            if(options.addFeaturedMedia) dispatch(apiRequest(MEDIA,CREATE,requestMediaData));
            break;
    }
    next (action);
}