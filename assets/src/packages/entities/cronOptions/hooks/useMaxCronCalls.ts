import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AutopilotRootState } from 'types/state';
import { CronOptions } from 'types/cronOptions';
import { setMaxCronCalls } from '../actions/cronOptions.actions';

namespace useMaxCronCalls {
    export type MaxCronCalls = CronOptions['maxCronCalls'];
    export type SetMaxCronCallsHandler = (value: MaxCronCalls) => void;
    export type UseMaxCronCalls = () => [MaxCronCalls, SetMaxCronCallsHandler]
}

/**
 * Custom hook for accessing and updating the maximum cron calls value from the Redux store.
 *
 * @returns {Array} An array containing the maximum cron calls value and a function to update the maximum cron calls value.
 * - maxCronCalls: The current maximum cron calls value obtained from the Redux store.
 * - setMaxCronCallsHandler: A function that allows updating the maximum cron calls value by dispatching the corresponding action.
 */

export const useMaxCronCalls: useMaxCronCalls.UseMaxCronCalls = () => {
    const dispatch = useDispatch();
    const maxCronCalls = useSelector((state: AutopilotRootState) => state.parse.cronOptions?.maxCronCalls);
    const setMaxCronCallsHandler = useCallback((value: useMaxCronCalls.MaxCronCalls) => {
        dispatch(setMaxCronCalls(value))
    }, []);
    return [maxCronCalls, setMaxCronCallsHandler];
}