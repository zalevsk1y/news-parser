import { useState } from "react";
import { useDispatch } from "react-redux";
import { CRON, UPDATE } from "@news-parser/config/constants";
import { requestApi } from "@news-parser/helpers/api/requestApi";
import { setCronOpions } from "../actions/cronOptions.actions";
import { defaultCronData } from '../constants';


export const useMutateCronOptions = () => {
    const dispatch = useDispatch();
    const [isMutating, setIsFetching] = useState(false);
    const success = (entity, event, cronData) => {
        const { msg, data } = cronData;
        dispatch(setCronOpions(data))
        return msg
    },
        error = (entity, event, errorData) => {
            const { msg } = errorData;
            console.error(msg.text);
            return { msg, posts: null };
        },
        mutateCronData = (cronData, event = UPDATE) => {
            const options = { entity: CRON, event, data: cronData };
            setIsFetching(true);
            return requestApi(options, success, error).then(resp => setIsFetching(false))
        }
    return [isMutating, mutateCronData];
}