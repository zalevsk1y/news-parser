import { useDispatch } from "react-redux";
import { useCallback} from "react";

export const  useSelectTitle=(body, options)=>{
    const dispatch=useDispatch();
    const selectFeaturedMedia = useCallback((selectedElements) => {
        const selectedElements = body || {};
        if (options?.noFeaturedMedia) return;
        for (let item in selectedElements) {
            if (selectedElements[item].tagName === "IMG") {
                selectedElements[item].content &&
                    dispatch(selectFeaturedMedia(selectedElements[item].content.src));
                break;
            }
        }
    }, [body, options]);
    return selectFeaturedMedia;
}