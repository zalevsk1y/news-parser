import { useGetPostFeaturedMedia, useGetPostTitle } from "@news-parser/entities/sidebarTemplate/hooks";
import { useGetUrl } from './useGetUrl';


export const useGetCurrentPostAttributes = () => {
    const featuredMedia = useGetPostFeaturedMedia();
    const title = useGetPostTitle();
    const url=useGetUrl();
    return {
        image:featuredMedia,
        link:url,
        title
    }
}