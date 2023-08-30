import { useState } from "react";
import { requestApi,RequestApiError,RequestApiOptions,RequestApiSuccess } from "@news-parser/helpers/api/requestApi";
import { cofigConstantsEvents, configConstantsEntities } from '@news-parser/config/constants';
import { useDispatch } from "react-redux";
import { ResponseType } from "@news-parser/types";
import { setHTML } from "../../actions/dialogData.actions";


export type FetchHTMLResponseType = ResponseType<string>;
export type isFetching = boolean;
export type StartFetching = (url: string) => Promise<FetchHTMLResponseType>;
export type UseFetchHTML = () => [isFetching, StartFetching];


/**
 * Custom hook for fetching HTML data.
 *
 * @returns {Array} A tuple containing the `isFetching` boolean state and the `startFetching` function.
 */

export const useFetchHTML: UseFetchHTML = () => {
    const [isFetching, setIsFetching] = useState(false);
        const dispatch = useDispatch();
        const success: RequestApiSuccess<FetchHTMLResponseType> = (htmlData) => {
            const { data } = htmlData;
            dispatch(setHTML(data));
            return new Promise(resolve => resolve(htmlData));
        };
        const error: RequestApiError = (errorData) => {
            const { data } = errorData;
            throw new Error(data.message.text);
        };
        const startFetching = (url: string) => {
            const options: RequestApiOptions = { entity: configConstantsEntities.RAW_HTML, event: cofigConstantsEvents.PARSE, data: { url } };
            setIsFetching(true);
            return requestApi(options, success, error).finally(() => { setIsFetching(false) })
        };
    return [isFetching, startFetching]
}   