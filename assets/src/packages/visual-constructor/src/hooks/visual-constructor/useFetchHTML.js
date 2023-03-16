import { useState } from "react";
import { useRequestApi } from "@news-parser/hooks/useRequestApi";
import { RAW_HTML, PARSE } from '@news-parser/config/constants';
import { useDispatch } from "react-redux";
import { closeVisulaConstructor, setHTML } from "../../actions/dialogData.actions";

export const useFetchHTML = () => {
    const [isFetching, setIsFetching] = useState(false),
        dispatch = useDispatch(),
        success = (entity, event, html) => {
            dispatch(setHTML(html))
        },
        error = (entity, event, errorData) => {
            const { msg } = errorData;
            dispatch(closeVisulaConstructor());
            msg && dispatch(showMessage(msg.type, msg.text));
        },
        startFetching = (url) => {
            const options = { entity: RAW_HTML, event: PARSE, data: { url } };
            setIsFetching(true);
            useRequestApi(options, success, error).then(resp => setIsFetching(false))
        };
    return [isFetching, startFetching]
}   