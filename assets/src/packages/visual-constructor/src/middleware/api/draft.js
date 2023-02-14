import { API_SUCCESS,apiRequest } from "@news-parser/parser-rss/actions/api.actions";
import { POST_DRAFT } from "../../constants";
import {CREATE_POST_DRAFT} from '../../actions/draft.actions';
import {DRAFT,INSERT,TEMPLATE,CREATE} from '@news-parser/parser-rss/constants';
import {getPostEditLink} from "@news-parser/helpers";
import {setPostMeta} from "@news-parser/parser-rss/actions/post.actions";
import {showMessage} from "@news-parser/message/";
import {closeDialog} from '../../actions/app.actions';
import {formatCreatePostDraftRequest} from '@news-parser/helpers/response-formatters/PostModel';
import {formatPostOptions} from '@news-parser/helpers/response-formatters/formatPostOptions';

export const draftMiddleware=({dispatch,getState})=>next=>action=>{
    next(action);
    switch (action.type){
        case CREATE_POST_DRAFT:
            const {parsedData,options,dialogData}=getState().parse.dialog.visualConstructor,
                postOptions=formatPostOptions(getState().parse.sidebar),
                preparedParsedData=formatCreatePostDraftRequest(parsedData,{generalOptions:options,postOptions},dialogData.url)
            dispatch(apiRequest(POST_DRAFT,CREATE,preparedParsedData));
            break;
        case `[${POST_DRAFT}:${CREATE}]${API_SUCCESS}`:
            const {_id}=getState().parse.dialog.visualConstructor.dialogData,
                {title,id}=action.payload.response,
                msg={
                        type:'success',
                        text:`Post "${title.raw}" was successfully parsed and save.`
                    };
            dispatch(closeDialog());
            dispatch(setPostMeta(DRAFT,INSERT,_id,{post_id:id,editLink:getPostEditLink(id)}));
            dispatch(showMessage(msg.type,msg.text));
            break;
    }
}