import { SUBMIT,LIST,URL } from "../../constants";
import { openDialog } from '../../actions/app.actions';
import {VISUAL_CONSTRUCTOR} from '@news-parser/visual-constructor/constants'
import {encodeUrlWithParams} from '@news-parser/helpers';
import {location} from 'globals';

export const submitMiddleware = ({dispatch})=>next=>action=>{
    next (action);
    switch(action.type){
        case `${SUBMIT}:${LIST}`:
            const params={entity:LIST,url:action.payload.url},                                                                                                                                                                           
            url=encodeUrlWithParams(params);
            location.assign(url);
            break;
        case `${SUBMIT}:${URL}`:
                dispatch(openDialog(0,action.payload.url,VISUAL_CONSTRUCTOR))
            break;
    }
}