import { useState } from "react";
import { requestApi } from "@news-parser/helpers/api/requestApi";
import { showMessage } from "@news-parser/message/actions/";
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
            requestApi(options, success, error).then(resp => setIsFetching(false))
        };
    return [isFetching, startFetching]
}   