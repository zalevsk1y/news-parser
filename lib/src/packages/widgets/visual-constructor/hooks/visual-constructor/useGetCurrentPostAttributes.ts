import { useGetPostFeaturedMedia, useGetPostTitle } from "@news-parser/entities/sidebarTemplate/hooks";
import { useGetUrl } from './useGetUrl';


export type  PostAttributes={
        image:string,
        title:string|false,
        link:string|false
    }
export type UseGetCurrentPostAttributes=()=>PostAttributes


/**
 * Custom hook for retrieving the current post attributes.
 *
 * @returns {Object} An object containing the current post attributes, such as image, link, and title.
 * - image: The featured media of the current post.
 * - link: The URL of the current post.
 * - title: The title of the current post.
 */


export const useGetCurrentPostAttributes:UseGetCurrentPostAttributes = () => {
    const featuredMedia = useGetPostFeaturedMedia();
    const title = useGetPostTitle();
    const url=useGetUrl();
    return {
        image:featuredMedia,
        link:url,
        title
    }
}