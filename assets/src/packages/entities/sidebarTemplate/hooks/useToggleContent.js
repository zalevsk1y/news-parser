import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux"
import { selectContent, removeContent } from "@news-parser/entities/sidebarTemplate/actions/parsedData.actions";
import { Parser } from "@news-parser/helpers/parser/Parser";

export const useToggleContent = () => {
    let frameRef;
    let document;
    let parser;
    const dispatch = useDispatch();
    const selectElement = useCallback((element) => {
        const { elementHash, parsedData } = parser.parseElementData(element);
        element.id = elementHash;
        dispatch(selectContent(elementHash, parsedData));
    }, [document]);
    const removeElement = useCallback((element) => {
        const hash = element.id;
        hash && dispatch(removeContent(hash));
    }, [document]);
    const initFrame = useCallback((ref) => {
        document = ref?.contentWindow?.document;
        parser = new Parser(ref);
        frameRef = ref
    }, []);
    return [selectElement, removeElement, initFrame];
}