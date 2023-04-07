import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux"
import { Parser } from "@news-parser/helpers/parser/Parser";

export const useToggleContent=(frameRef)=>{
    const document = useMemo(() => frameRef?.contentWindow?.document, [frameRef]);
    const dispatch = useDispatch();
    const parser = useMemo(() => frameRef?.contentWindow!==undefined&&new Parser(frameRef), [frameRef]);
    const selectElement = useCallback((element) => {
        let { elementHash, parsedData } = parser.parseElementData(element);
        element.id = elementHash;
        dispatch(selectContent(elementHash, parsedData));
    }, [document]);
    const removeElement = useCallback((element) => {
        const hash = element.id;
        hash && dispatch(removeContent(hash));
    }, [document]);
    return [selectElement,removeElement];
}