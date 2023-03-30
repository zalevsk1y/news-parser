import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux"
import { Parser } from "@news-parser/helpers/parser/Parser";
import { featuredImageParser } from "@news-parser/helpers/parser/FeaturedImageParser";
import { postTitleParser } from "@news-parser/helpers/parser/PostTitleParser";
//actions
import {
    selectTitle,
    selectFeaturedMedia,
    selectContent,
    removeContent,
} from "../../actions/parsedData.actions";

export const useFrameContent = (frameRef) => {
    console.log(frameRef,frameRef?.contentWindow?.document)
    const document = useMemo(() => frameRef?.contentWindow?.document, [frameRef]),
        dispatch = useDispatch(),
        parser = useMemo(() => frameRef?.contentWindow!==undefined&&new Parser(frameRef), [frameRef]),
        getTitle = useCallback(() => {
            const title = postTitleParser(document).findTitle() || "No title";
            dispatch(selectTitle(title));
        }, [document]),
        getFeaturedMedia = useCallback(() => {
            const image = featuredImageParser(document).findFeaturedImage();
            image !== false && dispatch(selectFeaturedMedia(image));
        }, [document]),
        selectElement = useCallback((element) => {
            let { elementHash, parsedData } = parser.parseElementData(element);
            element.id = elementHash;
            dispatch(selectContent(elementHash, parsedData));
        }, [document]),
        removeElement = useCallback((element) => {
            const hash = element.id;
            hash && dispatch(removeContent(hash));
        }, [document]);
    return [getTitle, getFeaturedMedia, selectElement, removeElement]
}