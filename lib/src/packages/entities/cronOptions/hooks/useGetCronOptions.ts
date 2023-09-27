import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { AutopilotRootState } from 'types/state';
import { CronOptions } from 'types/cronOptions';


export type IsCronOptionsSet=boolean;
export type UseGetCronOptions=()=>[IsCronOptionsSet,CronOptions]


/**
 * Custom hook for accessing the cron options from the Redux store.
 *
 * @returns {Array} An array containing the flag indicating if cron options are set and the cron options object.
 * - isCronOptionsSet: A boolean indicating if cron options are set.
 * - cronOptions: The cron options object obtained from the Redux store.
 */

export const useGetCronOptions: UseGetCronOptions = () => {
    const { cronOptions } = useSelector((state: AutopilotRootState) => state.parse);
    const isCronOptionsSet = useMemo(() => !!cronOptions?.url, [cronOptions])
    return [isCronOptionsSet, cronOptions]
}