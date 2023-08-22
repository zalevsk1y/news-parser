import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux"
import { selectContent, removeContent } from "@news-parser/entities/sidebarTemplate/actions/parsedData.actions";
import { Parser } from "@news-parser/helpers/parser/Parser";
import { ParserInterface } from "@news-parser/helpers/parser/types";

namespace useToggleContent{
    export type SelectElement=(element:HTMLElement)=>void;
    export type RemoveElement=(element:HTMLElement)=>void;
    export type InitFrame=(ref:HTMLIFrameElement)=>void;
    export type UseToggleConten=()=>[SelectElement,RemoveElement,InitFrame]
}

/**
 * Custom hook for toggling content and managing an iframe document.
 * @returns {Array} An array containing the selectElement, removeElement, and initFrame functions.
 */


export const useToggleContent:useToggleContent.UseToggleConten = () => {
    let frameRef;
    let document;
    let parser:ParserInterface;
    const dispatch = useDispatch();
    const selectElement = useCallback((element:HTMLElement) => {
        const { hash, content } = parser.parseElementData(element);
        element.id = hash;
        dispatch(selectContent({hash, content}));
    }, [document]);
    const removeElement = useCallback((element:HTMLElement) => {
        const hash = element.id;
        hash && dispatch(removeContent(hash));
    }, [document]);
    const initFrame = useCallback((ref:HTMLIFrameElement) => {
        document = ref?.contentWindow?.document;
        parser = new Parser(ref);
        frameRef = ref
    }, []);
    return [selectElement, removeElement, initFrame];
}