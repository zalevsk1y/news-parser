import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { requestApi } from '@news-parser/helpers/api/requestApi';
import { configConstantsEntities, cofigConstantsEvents } from '@news-parser/config/constants';
import { ResponseType } from '@news-parser/types';
import { setTemplates } from '../actions/templates.actions';
import { MessageFormat } from 'types/message';

namespace useFetchTemplates {
    export type TemplatesResponseType = ResponseType<Array<string>>;
    export type IsFetching = boolean;
    export type FetchTemplates = () => Promise<TemplatesResponseType>;
    export type UseFetchTemplates = () => [IsFetching, FetchTemplates]
}

/**
 * Custom hook for fetching templates and managing the fetch status by dispatching Redux actions.
 *
 * @returns {Array} An array containing the fetch status and the fetchTemplates function.
 * - isFetching: A boolean indicating whether a fetch request is currently in progress.
 * - fetchTemplates: A function that triggers the fetch request for templates and returns a promise.
 */

export const useFetchTemplates: useFetchTemplates.UseFetchTemplates = () => {
    const [isFetching, setIsFetching] = useState(false);
        const dispatch = useDispatch();
        const success: requestApi.RequestApiSuccess<useFetchTemplates.TemplatesResponseType> = (templatesDate) => {
            const { data } = templatesDate;
            dispatch(setTemplates(data));
            return new Promise(resoleve => resoleve(templatesDate))
        };
        const error: requestApi.RequestApiError = (errorData) => {
            const {data}=errorData;
            throw new Error(data.message.text);
        };
        const fetchTemplates = () => {
            const options = { entity: configConstantsEntities.TEMPLATE, event: cofigConstantsEvents.GET, data: null };
            setIsFetching(true);
            return requestApi(options, success, error).finally(() => setIsFetching(false))
        }
    return [isFetching, fetchTemplates];
}