import { configConstantsEntities, configConstantsMethods } from '@news-parser/config/constants';
import { useState } from 'react';
import { formatCreateMediaData } from '@news-parser/helpers/response-formatters/formatCreateMediaData';
import { requestApi,RequestApiError,RequestApiOptions,RequestApiSuccess } from '@news-parser/helpers/api/requestApi';
import { ResponseType } from '@news-parser/types';
import { MediaData } from 'types/post'


export type MediaResponceType = ResponseType<MediaData>;
export type CreateWpMediaCallback = (imageUrl: string, title: string, postID: number) => Promise<MediaResponceType>;
export type IsMutating = boolean;
export type UseDownloadMedia = () => [CreateWpMediaCallback, IsMutating]


/**
 * Custom hook for downloading media and handling the API request.
 *
 * @returns {Array} An array containing a function to create WordPress media and a boolean representing the mutating status.
 * - createWpMediaCallback: A function that triggers the API request to create WordPress media.
 * - IsMutating: A boolean representing the current mutating status.
 */

export const useDownloadMedia: UseDownloadMedia = () => {
    const [IsMutating, setIsMutating] = useState(false);
    const success: RequestApiSuccess<MediaResponceType> = mediaData => new Promise(resolve => resolve(mediaData))
    const error: RequestApiError = (errorData) => {
        const { data } = errorData;
        throw new Error(data.message.text);
    };
    const createWpMediaCallback: CreateWpMediaCallback = (imageUrl, title, postID) => {
        const requestMediaData = formatCreateMediaData(imageUrl, title, postID);
        const options: RequestApiOptions = { entity: configConstantsEntities.MEDIA, event: configConstantsMethods.CREATE, data: requestMediaData };
        return requestApi(options, success, error).finally(() => setIsMutating(true))
    }
    return [createWpMediaCallback, IsMutating];
}