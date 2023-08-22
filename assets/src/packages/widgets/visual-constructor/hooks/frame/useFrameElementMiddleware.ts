import { useMemo,useCallback } from "react";
import { featuredImageParser } from "@news-parser/helpers/parser/FeaturedImageParser";
import { postTitleParser } from "@news-parser/helpers/parser/PostTitleParser";
import { useSetPostTitle,useSetFeaturedMedia } from "@news-parser/entities/sidebarTemplate/hooks";

namespace useFrameElementMiddleware{
    export type GetTitle=(frameRef:HTMLIFrameElement)=>void;
    export type GetFeaturedMedia=(frameRef:HTMLIFrameElement)=>void;
    export type UseFrameElementMiddleware=()=>[GetTitle,GetFeaturedMedia]
}

/**
 * Custom hook for handling middleware logic related to a frame element.
 *
 * @returns {Array} An array containing functions to handle getting the post title and featured media from a frame element.
 * - getTitle: A function that retrieves the post title from a given frame element.
 * - getFeaturedMedia: A function that retrieves the featured media from a given frame element.
 */

export const useFrameElementMiddleware:useFrameElementMiddleware.UseFrameElementMiddleware = () => {
    const setPostTitle=useSetPostTitle();
    const setPostFeaturedMedia=useSetFeaturedMedia();
    const getTitle = useCallback((frameRef:HTMLIFrameElement) => {
        const document=frameRef.contentWindow?.document;
        if(document!==undefined){
            const title = postTitleParser(document).findTitle() || "No title";
            setPostTitle(title)
        }
        }, [setPostTitle,postTitleParser]);
    const getFeaturedMedia = useCallback((frameRef:HTMLIFrameElement) => {
        const document = frameRef.contentWindow?.document;
        if(document!==undefined){
            const image = featuredImageParser(document).findFeaturedImage();
            image !== false && setPostFeaturedMedia(image);
        }
        }, [setPostFeaturedMedia,featuredImageParser]);
        return [getTitle,getFeaturedMedia]
    }