import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AutopilotRootState } from 'types/state';
import { CronOptions } from 'types/cronOptions';
import { setInterval } from '../actions/cronOptions.actions';


export type Interval = CronOptions['interval'];
export type SetIntervalHandler = (value: Interval) => void;
export type UseInterval = () => [Interval, SetIntervalHandler]


/**
 * Custom hook for accessing and updating the interval value from the Redux store.
 *
 * @returns {Array} An array containing the interval value and a function to update the interval value.
 * - interval: The current interval value obtained from the Redux store.
 * - setIntervalHandler: A function that allows updating the interval value by dispatching the corresponding action.
 */

export const useInterval: UseInterval = () => {
    const dispatch = useDispatch();
    const interval = useSelector((state: AutopilotRootState) => state.parse.cronOptions?.interval);
    const setIntervalHandler = useCallback((value: Interval) => dispatch(setInterval(value)), []);
    return [interval, setIntervalHandler];
}