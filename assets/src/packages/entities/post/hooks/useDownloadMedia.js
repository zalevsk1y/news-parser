import { MEDIA, CREATE } from '@news-parser/config/constants/';
import { useState } from 'react';
import { formatCreateMediaData } from '@news-parser/helpers/response-formatters/formatCreateMediaData';
import { requestApi } from "@news-parser/helpers/api/requestApi";

export const useDownloadMedia = () => {
    const [IsMutating, setIsMutating] = useState(false);
    const success = (entity, event, mediaData) => {
        console.log(mediaData)
        return true;
    };
    const error = (entity, event, errorData) => {
        const { msg } = errorData;
        console.error(msg.text);
        return { msg, posts: null };
    };
    const createWpMediaCallback = (imageUrl, title, postId) => {
        const requestMediaData = formatCreateMediaData(imageUrl, title, postId);
        const options = { entity: MEDIA, event: CREATE, data: requestMediaData };
        return requestApi(options, success, error).then(wpImageData => {
            setIsMutating(true);
            return wpImageData;
        })
    }
    return [createWpMediaCallback, IsMutating];
}