import { requestApi,RequestApiSuccess,RequestApiError, RequestApiOptions } from '@news-parser/helpers/api/requestApi'
import { useState } from 'react'
import { configConstantsEntities, cofigConstantsEvents } from '@news-parser/config/constants';
import { useDispatch } from 'react-redux';
import { Tag } from 'types/sidebar';
import { mapTags } from '../actions/tag.actions';

export type FetchTagsResponseType = Tag[];
export type IsFetching = boolean;
export type StartFetching = () => Promise<Tag[]>
export type UseFetchTags = () => [IsFetching, StartFetching]


/**
 * Custom hook for fetching tags.
 * @type {UseFetchTags}
 * @returns {Array} An array containing the isFetching flag and the startFetching function.
 */


export const useFetchTags: UseFetchTags = () => {
    const [isFetching, setIsFetching] = useState(false);
    const options:RequestApiOptions = { entity: configConstantsEntities.API_WP_TAGS, event: cofigConstantsEvents.GET, data: null, searchParams: { page: 1 } };
    const dispatch = useDispatch();
    const tagsMap: Record<string, Tag> = {};
    const error: RequestApiError = (errorData) => {
        const { data } = errorData;
        throw new Error(data.message.text);
    };
    const success: RequestApiSuccess<FetchTagsResponseType> = (tags) => {
        if (tags.length > 0) {
            tags.forEach(tag => {
                tagsMap[tag.name] = tag;
            })
            options.searchParams.page++;
            return requestApi(options, success, error)
        } 
            setIsFetching(false)
            dispatch(mapTags(tagsMap));
            return new Promise(resolve => resolve(tags))
        
    };
    const startFetching = () => {
        options.searchParams.page = 1;
        setIsFetching(true);
        return requestApi(options, success, error).finally(()=>setIsFetching(false))
    }
    return [isFetching, startFetching];
}