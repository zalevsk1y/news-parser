import { useDispatch } from 'react-redux';
import { requestApi,RequestApiError,RequestApiOptions,RequestApiSuccess } from '@news-parser/helpers/api/requestApi';
import { configConstantsEntities, cofigConstantsEvents } from '@news-parser/config/constants';
import { useState } from 'react';
import { Tag } from 'types/sidebar';
import { pushTag } from '../actions/tag.actions';


export type CreateTagResponseType = Tag;
export type IsMutating = boolean;
export type CreateTag = (tagName: string) => Promise<Tag>;
export type UseCreateTag = () => [IsMutating, CreateTag]


/**
 * Custom hook for creating a tag.
 * @type {UseCreateTag}
 * @returns {Array} An array containing the isMutating flag and the createTag function.
 */

export const useCreateTag: UseCreateTag = () => {
    const dispatch = useDispatch();
    const [isMutating, setIsMutating] = useState(false);
    const success: RequestApiSuccess<CreateTagResponseType> = (tag) => {
        dispatch(pushTag(tag));
        return new Promise(resolve => resolve(tag))
    };
    const error: RequestApiError = (errorData) => {
        const { data } = errorData;
        throw new Error(data.message.text);
    };
    const createTag: CreateTag = (tagName) => {
        const options: RequestApiOptions = { entity: configConstantsEntities.API_WP_TAGS, event: cofigConstantsEvents.POST, data: { name: tagName } };
        setIsMutating(true);
        return requestApi(options, success, error).finally(() => setIsMutating(false));
    };
    return [isMutating, createTag];
} 