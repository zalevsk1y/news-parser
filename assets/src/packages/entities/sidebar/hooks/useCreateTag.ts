import { useDispatch } from 'react-redux';
import { requestApi } from '@news-parser/helpers/api/requestApi';
import { configConstantsEntities, cofigConstantsEvents } from '@news-parser/config/constants';
import { useState } from 'react';
import { Tag } from 'types/sidebar';
import { pushTag } from '../actions/tag.actions';

namespace useCreateTag {
    export type CreateTagResponseType = Tag;
    export type IsMutating = boolean;
    export type CreateTag = (tagName: string) => Promise<Tag>;
    export type UseCreateTag = () => [IsMutating, CreateTag]
}

/**
 * Custom hook for creating a tag.
 * @type {UseCreateTag}
 * @returns {Array} An array containing the isMutating flag and the createTag function.
 */

export const useCreateTag: useCreateTag.UseCreateTag = () => {
    const dispatch = useDispatch();
    const [isMutating, setIsMutating] = useState(false);
    const success: requestApi.RequestApiSuccess<useCreateTag.CreateTagResponseType> = (tag) => {
        dispatch(pushTag(tag));
        return new Promise(resolve => resolve(tag))
    };
    const error: requestApi.RequestApiError = (errorData) => {
        const { msg } = errorData;
        throw new Error(msg);
    };
    const createTag: useCreateTag.CreateTag = (tagName) => {
        const options: requestApi.RequestApiOptions = { entity: configConstantsEntities.API_WP_TAGS, event: cofigConstantsEvents.POST, data: { name: tagName } };
        setIsMutating(true);
        return requestApi(options, success, error).finally(() => setIsMutating(false));
    };
    return [isMutating, createTag];
} 