import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux"
import { selectContent, removeContent } from "@news-parser/entities/sidebarTemplate/actions/parsedData.actions";
import { Parser } from "@news-parser/helpers/parser/Parser";
import { ParserInterface } from "@news-parser/helpers/parser/types";


export type SelectElement = (element: HTMLElement) => void;
export type RemoveElement = (element: HTMLElement) => void;
export type UseToggleConten = (frameRef: HTMLIFrameElement|null) => [SelectElement, RemoveElement]


/**
 * Custom hook for toggling content and managing an iframe document.
 * @returns {Array} An array containing the selectElement, removeElement, and initFrame functions.
 */


export const useToggleContent: UseToggleConten = (frameRef) => {
    let parser: ParserInterface|null = useMemo(() =>frameRef===null?null:new Parser(frameRef), [frameRef])
    const dispatch = useDispatch();
    const selectElement = useCallback((element: HTMLElement) => {
        if(parser===null) return;
        const { hash, content } = parser.parseElementData(element);
        element.id = hash;
        dispatch(selectContent({ hash, content }));
    }, [parser]);
    const removeElement = useCallback((element: HTMLElement) => {
        if(parser===null) return;
        const hash = element.id;
        hash && dispatch(removeContent(hash));
    }, [parser]);

    return [selectElement, removeElement];
}