import { Parser } from "@news-parser/helpers/parser/Parser";
import { featuredImageParser } from "@news-parser/helpers/parser/FeaturedImageParser";
import { postTitleParser } from "@news-parser/helpers/parser/PostTitleParser";
import { useSetPostTitle,useSetPostFeaturedMedia } from "@news-parser/entities/sidebarTemplate/hooks";

export const useFrameElementMiddleware = () => {
    const setPostTitle=useSetPostTitle();
    const setPostFeaturedMedia=useSetPostFeaturedMedia();
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