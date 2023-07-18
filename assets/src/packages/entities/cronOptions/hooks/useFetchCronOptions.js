import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { setCronOpions } from '../../../entities/cronOptions/actions/cronOptions.actions';
import { requestApi } from "@news-parser/helpers/api/requestApi";
import { CRON, GET } from '@news-parser/config/constants';
import { defaultCronData } from '../constants';

export const useFetchCronOptions = () => {
    const [isFetching, setIsFetching] = useState(false);
    const dispatch = useDispatch(),
        success = (entity, event, cronOptions) => {
            const { msg, data } = cronOptions;
            dispatch(setCronOpions(data));
            return msg
        },
        error = (entity, event, errorData) => {
            const { msg } = errorData;
            console.error(msg.text);
            return { msg, posts: null };
        },
        fetchCron = (url) => {
            const options = { entity: CRON, event: GET, data: { url } };
            setIsFetching(true);
            return requestApi(options, success, error).then(resp => setIsFetching(false))
        }
    return [isFetching, fetchCron];
}