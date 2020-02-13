import { MEDIA,CREATE,POST_DRAFT } from '../../constants/';
import { apiRequest } from '@news-parser/parser-rss/actions/api.actions';
import {formatCreateMediaData} from '@news-parser/helpers/classes/formatCreateMediaData';

export const mediaMiddleware = (store)=>next=>action=>{
    next (action);
    switch(action.type){
        case `[${POST_DRAFT}:${CREATE}]API_SUCCESS`:
            const {dispatch,getState}=store,
                {parsedData,options}=getState().parse.dialog.visualConstructor,
                {title,id}=action.payload.response,
                requestMediaData=formatCreateMediaData(parsedData.image,title.raw,id);
            if(options.addFeaturedMedia) dispatch(apiRequest(MEDIA,CREATE,requestMediaData));
            break;
    }
}