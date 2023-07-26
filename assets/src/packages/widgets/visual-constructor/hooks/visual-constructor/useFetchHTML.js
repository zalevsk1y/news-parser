import { useState } from "react";
import { requestApi } from "@news-parser/helpers/api/requestApi";
import { RAW_HTML, PARSE } from '@news-parser/config/constants';
import { useDispatch } from "react-redux";
import { setHTML } from "../../actions/dialogData.actions";

export const useFetchHTML = () => {
    const [isFetching, setIsFetching] = useState(false),
        dispatch = useDispatch(),
        success = (entity, event, htmlData) => {
            const {data}=htmlData;
            console.log(data);
            dispatch(setHTML(data));
            return data;
        },
        error = (entity, event, errorData) => {
            const { msg } = errorData;
            return errorData
        },
        startFetching = (url) => {
            const options = { entity: RAW_HTML, event: PARSE, data: { url } };
            setIsFetching(true);
            return requestApi(options, success, error).then(resp => {
                setIsFetching(false)
                return resp;
            })
        };
    return [isFetching, startFetching]
}   