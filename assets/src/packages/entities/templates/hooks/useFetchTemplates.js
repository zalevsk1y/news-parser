import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { setTemplates } from '../actions/templates.actions';
import { requestApi } from "@news-parser/helpers/api/requestApi";
import { TEMPLATE, GET } from '@news-parser/config/constants';

export const useFetchTemplates = () => {
    const [isFetching, setIsFetching] = useState(false),
        dispatch = useDispatch(),
        success = (entity, event, template) => {
            const { msg, data } = template;
            dispatch(setTemplates(data));
            return msg
        },
        error = (entity, event, errorData) => {
            const { msg } = errorData;
            console.error(msg.text);
            return { msg, posts: null };
        },
        fetchTemplates = () => {
            const options = { entity: TEMPLATE, event: GET, data: null };
            setIsFetching(true);
            return requestApi(options, success, error).then(resp => setIsFetching(false))
        }
    return [isFetching, fetchTemplates];
}