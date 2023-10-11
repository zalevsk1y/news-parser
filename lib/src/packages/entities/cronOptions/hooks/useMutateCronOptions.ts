import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { configConstantsEntities, cofigConstantsEvents } from '@news-parser/config/constants';
import { requestApi,RequestApiError,RequestApiOptions,RequestApiSuccess } from '@news-parser/helpers/api/requestApi';
import { CronOptions } from 'types/cronOptions';
import { ResponseType } from '@news-parser/types';
import { setCronOpions } from '../actions/cronOptions.actions';



export type IsMutating = boolean;
export type MutateCronResponseType = ResponseType<CronOptions>;
export type MutatCronData = (cronData: CronOptions|{url:string}, event?: string) => Promise<MutateCronResponseType>;
export type UseMutateCronOptions = () => [IsMutating, MutatCronData]

/**
 * Custom hook for mutating cron options and handling the API request.
 *
 * @returns {Array} An array containing the mutating status and a function to mutate the cron options.
 * - isMutating: A boolean representing the current mutating status.
 * - mutateCronData: A function that triggers the API request to mutate the cron options.
 */

export const useMutateCronOptions: UseMutateCronOptions = () => {
    const dispatch = useDispatch();
    const [isMutating, setIsFetching] = useState(false);
    const success: RequestApiSuccess<MutateCronResponseType> = (cronData) => {
        const { data } = cronData;
        dispatch(setCronOpions(data))
        return new Promise(resolve => resolve(cronData))
    };
        const error: RequestApiError = (errorData) => {
            const { data } = errorData;
            throw new Error(data.message.text);
        };
        const mutateCronData: MutatCronData = (cronData, event = cofigConstantsEvents.UPDATE) => {
            const options: RequestApiOptions = { entity: configConstantsEntities.CRON, event, data: cronData };
            setIsFetching(true);
            return requestApi(options, success, error).finally(() => setIsFetching(false))
        }
    return [isMutating, mutateCronData];
}