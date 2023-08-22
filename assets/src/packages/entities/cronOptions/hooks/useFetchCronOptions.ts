import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { requestApi } from '@news-parser/helpers/api/requestApi';
import { configConstantsEntities, cofigConstantsEvents } from '@news-parser/config/constants';
import { CronOptions } from 'types/cronOptions';
import { ResponseType } from 'types';
import { setCronOpions } from '../actions/cronOptions.actions';


namespace useFetchCronOptions {
    export type CronOptionsResponseType = ResponseType<CronOptions>;
    export type IsFetching = boolean;
    export type FetchCronHandler = (url: string) => Promise<CronOptionsResponseType>
    export type UseFetchCronOptions = () => [boolean, FetchCronHandler];

}

/**
 * Custom hook for fetching cron options and handling the API request.
 *
 * @returns {Array} An array containing the fetching status and a function to fetch the cron options.
 * - isFetching: A boolean representing the current fetching status.
 * - fetchCron: A function that triggers the API request to fetch the cron options.
 */

export const useFetchCronOptions: useFetchCronOptions.UseFetchCronOptions = () => {
    const [isFetching, setIsFetching] = useState(false);
    const dispatch = useDispatch();
        const success: requestApi.RequestApiSuccess<useFetchCronOptions.CronOptionsResponseType> = (cronOptions) => {
            const { data } = cronOptions;
            dispatch(setCronOpions(data));
            return new Promise((resolve) => resolve(cronOptions))
        };
        const error: requestApi.RequestApiError = (errorData) => {
            const { msg } = errorData;
            throw new Error(msg);
        };
        const fetchCron: useFetchCronOptions.FetchCronHandler = (url) => {
            const options = { entity: configConstantsEntities.CRON, event: cofigConstantsEvents.GET, data: { url } };
            setIsFetching(true);
            return requestApi(options, success, error).finally(() => setIsFetching(false))
        }
    return [isFetching, fetchCron];
}