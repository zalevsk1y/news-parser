import { useState } from "react";
import { requestApi } from "@news-parser/helpers/api/requestApi";
import { TEMPLATE, GET } from '@news-parser/config/constants';
import { useDispatch } from "react-redux";
import { decodeHTMLEntities } from "@news-parser/helpers"
import { setList } from "../../../parser-rss/src/actions/list.actions";

export const useFetchTemplate=()=>{
    const [isFetching, setIsFetching] = useState(false),
    dispatch = useDispatch(),
    success = (entity, event, postData) => {
        const { msg, data } = postData,
            posts = data.map((post, index) => {
                post._id = parseInt(index);
                post.description = decodeHTMLEntities(post.description);
                post.title = decodeHTMLEntities(post.title);
                return post;
            });
        dispatch(setList(posts));
        return msg    
    },
    error = (entity, event, errorData) => {
        const { msg } = errorData;
        console.error(msg.text);
        return {msg, posts:null};
    },
    fetchTemplate = (url) => {
        const options = { entity: TEMPLATE, event: Get, data: { url } };
        setIsFetching(true);
        return requestApi(options, success, error).then(resp => setIsFetching(false))
    }
return [isFetching, fetchTemplate]
}