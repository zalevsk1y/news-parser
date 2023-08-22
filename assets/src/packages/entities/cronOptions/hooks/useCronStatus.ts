import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CronOptions } from 'types/cronOptions';
import { AutopilotRootState } from 'types/state';
import { setCronStatus } from '../actions/cronOptions.actions';

namespace useCronStatus {
    export type CronStatus = CronOptions['status'];
    export type ChangeCronStatus = (status: CronStatus) => void;
    export type UseCronStatus = () => [CronStatus, ChangeCronStatus]
}

/**
 * Custom hook for accessing and updating the cron status from the Redux store.
 *
 * @returns {Array} An array containing the cron status and a function to change the cron status.
 * - cronStatus: The current cron status obtained from the Redux store.
 * - changeCronStatus: A function that allows changing the cron status by dispatching the corresponding action.
 */

export const useCronStatus: useCronStatus.UseCronStatus = () => {
    const dispatch = useDispatch();
    const cronStatus = useSelector((state: AutopilotRootState) => state.parse.cronOptions?.status);
    const changeCronStatus = useCallback((status: useCronStatus.CronStatus) => dispatch(setCronStatus(status)), [dispatch])
    return [cronStatus, changeCronStatus]
}