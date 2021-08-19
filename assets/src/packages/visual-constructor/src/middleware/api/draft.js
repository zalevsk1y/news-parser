import { apiRequest } from "@news-parser/parser-rss/actions/api.actions";
import { POST_DRAFT,CREATE } from "../../constants";
import {CREATE_POST_DRAFT} from '../../actions/draft.actions';
import {DRAFT,INSERT} from '@news-parser/parser-rss/constants';
import {getPostEditLink} from "@news-parser/helpers";
import {setPostMeta} from "@news-parser/parser-rss/actions/post.actions";
import {showMessage} from "@news-parser/message/"
import {formatCreatePostDraftRequest} from '@news-parser/helpers/response-formatters/PostModel';

export const draftMiddleware=({dispatch,getState})=>next=>action=>{
    next(action);
    switch (action.type){
        case CREATE_POST_DRAFT:
            const {parsedData,options,dialogData}=getState().parse.dialog.visualConstructor,
                preparedParsedData=formatCreatePostDraftRequest(parsedData,options,dialogData.url)
            dispatch(apiRequest(POST_DRAFT,CREATE,preparedParsedData));
            break;
        case `[${POST_DRAFT}:${CREATE}]API_SUCCESS`:
            const {_id}=getState().parse.dialog.visualConstructor.dialogData,
                {title,id}=action.payload.response,
                msg={
                        type:'success',
                        text:`Post "${title.raw}" was successfully parsed and save as "draft".`
                    };
            dispatch(setPostMeta(DRAFT,INSERT,_id,{post_id:id,editLink:getPostEditLink(id)}));
            dispatch(showMessage(msg.type,msg.text));
            break;

    }
}