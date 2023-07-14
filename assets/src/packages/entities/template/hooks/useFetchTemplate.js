import { useState } from "react";
import { requestApi } from "@news-parser/helpers/api/requestApi";
import { TEMPLATE, GET } from '@news-parser/config/constants';
import { useDispatch } from "react-redux";
import { setTemplate } from "../actions/template.actions";

export const useFetchTemplate = () => {
    const [isFetching, setIsFetching] = useState(false),
        dispatch = useDispatch(),
        success = (entity, event, template) => {
            const { msg, data } = template;
            dispatch(setTemplate(data));
            return msg
        },
        error = (entity, event, errorData) => {
            const { msg } = errorData;
            console.error(msg.text);
            return { msg, posts: null };
        },
        fetchTemplate = (url) => {
            const options = { entity: TEMPLATE, event: GET, data: { url } };
            setIsFetching(true);
            return requestApi(options, success, error).then(resp => setIsFetching(false))
        }
    return [isFetching, fetchTemplate]
}