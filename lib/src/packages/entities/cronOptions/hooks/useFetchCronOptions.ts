import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { requestApi,RequestApiError,RequestApiOptions,RequestApiSuccess } from '@news-parser/helpers/api/requestApi';
import { configConstantsEntities, cofigConstantsEvents } from '@news-parser/config/constants';
import { CronOptions } from 'types/cronOptions';
import { ResponseType } from 'types';
import { setCronOpions } from '../actions/cronOptions.actions';



export type CronOptionsResponseType = ResponseType<CronOptions>;
export type IsFetching = boolean;
export type FetchCronHandler = (url: string) => Promise<CronOptionsResponseType>
export type UseFetchCronOptions = () => [boolean, FetchCronHandler];


/**
 * Custom hook for fetching cron options and handling the API request.
 *
 * @returns {Array} An array containing the fetching status and a function to fetch the cron options.
 * - isFetching: A boolean representing the current fetching status.
 * - fetchCron: A function that triggers the API request to fetch the cron options.
 */

export const useFetchCronOptions: UseFetchCronOptions = () => {
    const [isFetching, setIsFetching] = useState(false);
    const dispatch = useDispatch();
        const success: RequestApiSuccess<CronOptionsResponseType> = (cronOptions) => {
            const { data } = cronOptions;
            dispatch(setCronOpions(data));
            return new Promise((resolve) => resolve(cronOptions))
        };
        const error: RequestApiError = (errorData) => {
            const { data } = errorData;
            throw new Error(data.message.text);
        };
        const fetchCron: FetchCronHandler = (url) => {
            const options:RequestApiOptions = { entity: configConstantsEntities.CRON, event: cofigConstantsEvents.GET, data: { url } };
            setIsFetching(true);
            return requestApi(options, success, error).finally(() => setIsFetching(false))
        }
    return [isFetching, fetchCron];
}