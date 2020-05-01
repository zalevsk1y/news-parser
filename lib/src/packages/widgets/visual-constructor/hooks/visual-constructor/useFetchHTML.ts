import { useCallback, useState, useRef } from "react";
import { requestApi, RequestApiError, RequestApiOptions, RequestApiSuccess } from "@news-parser/helpers/api/requestApi";
import { cofigConstantsEvents, configConstantsEntities } from '@news-parser/config/constants';
import { useDispatch } from "react-redux";
import { ResponseType } from "@news-parser/types";
import { setHTML } from "../../actions/dialogData.actions";
import { useDialogCache } from "./useDialogCache";


export type FetchHTMLResponseType = ResponseType<{ html: string, url: string }>;
export type isFetching = boolean;
export type AbortFetching = () => void;
export type StartFetching = (url: string) => Promise<FetchHTMLResponseType>;
export type UseFetchHTML = () => [isFetching, AbortFetching, StartFetching];


/**
 * Custom hook for fetching HTML data.
 *
 * @returns {Array} A tuple containing the `isFetching` boolean state and the `startFetching` function.
 */

export const useFetchHTML: UseFetchHTML = () => {
    const [isFetching, setIsFetching] = useState(false);
    const dispatch = useDispatch();
    const getDialogCache = useDialogCache();
    const abortController=useRef<AbortController|null>(null);
    const abortFetching = () => { abortController.current !== null && abortController.current.abort() };
    const success: RequestApiSuccess<FetchHTMLResponseType> = (htmlData) => {
        const { data } = htmlData;
        dispatch(setHTML(data.html));
        return new Promise(resolve => resolve(htmlData));
    };
    const error: RequestApiError = (errorData) => {
        const { data } = errorData;
        throw new Error(data.message.text);
    };
    const startFetching = (url: string) => {
        const cachedHTML = getDialogCache(url);
        if (cachedHTML !== false) {
            setHTML(cachedHTML);
            const response: FetchHTMLResponseType = {
                data: {
                    html: cachedHTML,
                    url: url
                },
                msg: {
                    type: 'success',
                    text: 'Cached page HTML'
                }
            }
            return new Promise(resolve => resolve(response)) as Promise<FetchHTMLResponseType>
        }
        abortController.current = new AbortController()
        const options: RequestApiOptions = { entity: configConstantsEntities.RAW_HTML, event: cofigConstantsEvents.PARSE, data: { url } };
        setIsFetching(true);
        return requestApi(options, success, error, abortController.current).finally(() => { setIsFetching(false) })
    };
    return [isFetching, abortFetching, startFetching]
}   