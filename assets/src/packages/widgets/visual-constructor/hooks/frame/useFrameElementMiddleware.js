import { useMemo,useCallback } from "react";
import { featuredImageParser } from "@news-parser/helpers/parser/FeaturedImageParser";
import { postTitleParser } from "@news-parser/helpers/parser/PostTitleParser";
import { useSetPostTitle,useSetFeaturedMedia } from "@news-parser/entities/sidebarTemplate/hooks";

export const useFrameElementMiddleware = () => {
    const setPostTitle=useSetPostTitle();
    const setPostFeaturedMedia=useSetFeaturedMedia();
    const getTitle = useCallback((frameRef) => {
        const document = useMemo(() => frameRef?.contentWindow?.document, [frameRef]);
            const title = postTitleParser(document).findTitle() || "No title";
            setPostTitle(title)
        }, [setPostTitle,postTitleParser]);
    const getFeaturedMedia = useCallback((frameRef) => {
        const document = useMemo(() => frameRef?.contentWindow?.document, [frameRef]);
            const image = featuredImageParser(document).findFeaturedImage();
            image !== false && setPostFeaturedMedia(image);
        }, [setPostFeaturedMedia,featuredImageParser]);
        return [getTitle,getFeaturedMedia]
    }