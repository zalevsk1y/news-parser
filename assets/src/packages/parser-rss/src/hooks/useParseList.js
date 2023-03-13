import { useState } from "react";
import { useRequestApi } from "../../../hooks/useRequestApi";
import { PARSER_RSS_LIST, PARSE } from '@news-parser/config/constants';
import { useDispatch, useStore } from "react-redux";
import {showMessage} from "@news-parser/message";
import {decodeHTMLEntities} from "@news-parser/helpers"
import { setList } from "../actions/list.actions";
import {getTemplate} from "@news-parser/template/actions"

export const useParseList = () => {
    const [isFetching, setIsFetching] = useState(false),
        {getState}=useStore(),
        dispatch=useDispatch(),
        success = (entity, event, postData) => {
            const { msg, data } = postData,
                posts = data.map((post, index) => {
                    post._id = parseInt(index);
                    post.description = decodeHTMLEntities(post.description);
                    post.title = decodeHTMLEntities(post.title);
                    return post;
                });
            dispatch(setList(posts));
            msg && dispatch(showMessage(msg.type, msg.text));
            dispatch(getTemplate(getState().parse.appState.data.url))
        },
        error = (entity, event, errorData) => {
            const { msg } = errorData;
            msg && dispatch(showMessage(msg.type, msg.text));
        },
        fetchPostsLis = (url) => {
            const options = { entity: PARSER_RSS_LIST, event: PARSE, data: { url } };
            setIsFetching(true);
            useRequestApi(options, success, error).then(resp => setIsFetching(false))
        }
    return [isFetching, fetchPostsLis]
}