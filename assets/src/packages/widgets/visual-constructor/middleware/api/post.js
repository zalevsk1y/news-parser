import { API_SUCCESS,apiRequest } from "@news-parser/parser-rss/actions/api.actions";
import { WP_POST } from "../../constants";
import {CREATE_WP_POST} from '../../actions/post.actions';
import {DRAFT,INSERT,TEMPLATE,CREATE} from '@news-parser/parser-rss/constants';
import {getPostEditLink} from "@news-parser/helpers";
import {setPostMeta} from "@news-parser/parser-rss/actions/post.actions";
import {showMessage} from "@news-parser/message/";
import {closeVisulaConstructor} from '../../actions/dialogData.actions';
import {formatCreatePostDraftRequest} from '@news-parser/helpers/response-formatters/PostModel';
import {formatPostOptions} from '@news-parser/helpers/response-formatters/formatPostOptions';

export const postMiddleware=({dispatch,getState})=>next=>action=>{
    next(action);
    switch (action.type){
        case CREATE_WP_POST:
            const {parsedData,options,dialogData}=getState().parse.dialog.visualConstructor,
                postOptions=formatPostOptions(getState().parse.sidebar),
                preparedParsedData=formatCreatePostDraftRequest(parsedData,{generalOptions:options,postOptions},dialogData.url)
            dispatch(apiRequest(WP_POST,CREATE,preparedParsedData));
            break;
        case `[${WP_POST}:${CREATE}]${API_SUCCESS}`:
            const {_id}=getState().parse.dialog.visualConstructor.dialogData,
                {title,id}=action.payload.response,
                msg={
                        type:'success',
                        text:`Post "${title.raw}" was successfully parsed and save.`
                    };
            dispatch(closeVisulaConstructor());
            dispatch(setPostMeta(DRAFT,INSERT,_id,{post_id:id,editLink:getPostEditLink(id)}));
            dispatch(showMessage(msg.type,msg.text));
            break;
    }
}