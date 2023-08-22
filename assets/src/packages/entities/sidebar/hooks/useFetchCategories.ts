import { requestApi } from '@news-parser/helpers/api/requestApi'
import { useState } from 'react'
import { configConstantsEntities, cofigConstantsEvents } from '@news-parser/config/constants';
import { useDispatch } from 'react-redux';
import { Category } from 'types/sidebar';
import { pushCategory } from '../actions/category.actions';

namespace useFetchCategories {
    export type FetchCategories = Category[];
    export type IsFetching = boolean;
    export type StartFetching = () => Promise<Category[]>;
    export type UseFetchCategories = () => [IsFetching, StartFetching]
}

/**
 * Custom hook for fetching categories.
 * @type {UseFetchCategories}
 * @returns {Array} An array containing the isFetching flag and the startFetching function.
 */


export const useFetchCategories: useFetchCategories.UseFetchCategories = () => {
    const [isFetching, setIsFetching] = useState<useFetchCategories.IsFetching>(false);
    const options: requestApi.RequestApiOptions = { entity: configConstantsEntities.API_WP_CATEGORIES, event: cofigConstantsEvents.GET, data: null, searchParams: { page: 1 } };
    const dispatch = useDispatch();
    const error: requestApi.RequestApiError = (errorData) => {
        const { msg } = errorData;
        throw new Error(msg)
    };
    const success: requestApi.RequestApiSuccess<useFetchCategories.FetchCategories> = (categories) => {
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