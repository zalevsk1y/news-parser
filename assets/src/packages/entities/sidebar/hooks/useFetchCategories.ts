import { requestApi,RequestApiError,RequestApiSuccess,RequestApiOptions } from '@news-parser/helpers/api/requestApi'
import { useState } from 'react'
import { configConstantsEntities, cofigConstantsEvents } from '@news-parser/config/constants';
import { useDispatch } from 'react-redux';
import { Category } from 'types/sidebar';
import { pushCategory } from '../actions/category.actions';

export type FetchCategories = Category[];
export type IsFetching = boolean;
export type StartFetching = () => Promise<Category[]>;
export type UseFetchCategories = () => [IsFetching, StartFetching]


/**
 * Custom hook for fetching categories.
 * @type {UseFetchCategories}
 * @returns {Array} An array containing the isFetching flag and the startFetching function.
 */


export const useFetchCategories: UseFetchCategories = () => {
    const [isFetching, setIsFetching] = useState<IsFetching>(false);
    const options: RequestApiOptions = { entity: configConstantsEntities.API_WP_CATEGORIES, event: cofigConstantsEvents.GET, data: null, searchParams: { page: 1 } };
    const dispatch = useDispatch();
    const error: RequestApiError = (errorData) => {
        const { data } = errorData;
        throw new Error(data.message.text);
    };
    const success: RequestApiSuccess<FetchCategories> = (categories) => {
        if (categories.length > 0) {
            dispatch(pushCategory(categories));
            options.searchParams.page++;
            return requestApi(options, success, error)
        }
        return new Promise(resolve => resolve(categories));
    };
    const startFetching = () => {
        options.searchParams.page = 1;
        setIsFetching(true);
        return requestApi(options, success, error).finally(() => setIsFetching(false))
    }
    return [isFetching, startFetching];
}