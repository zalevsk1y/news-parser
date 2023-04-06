import { useCallback } from "react";
import { useDispatch } from "react-redux";

export const useSelectTag = (tags) => {
    const [isMutating, startTagsMutation] = useCreateTag();
    const dispatch = useDispatch();
    const selectTag = useCallback((tag) => {
        const tagExists = tags.filter((item) => item.name === tag.name)[0];
        if (tagExists === undefined) {
            startTagsMutation(tag);
        } else {
            dispatch(selectTag(tagExists.id));
        }
    }, [tags]);
    return [isMutating, selectTag]
}