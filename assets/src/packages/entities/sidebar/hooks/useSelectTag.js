import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useCreateTag } from './useCreateTag';
import {selectTag} from '../actions/tag.actions'

export const useSelectTag = (tags) => {
    const [isMutating, startTagsMutation] = useCreateTag();
    const dispatch = useDispatch();
    const selectTagHandler = useCallback((tag) => {
        const tagExists = tags.filter((item) => item.name === tag.name)[0];
        if (tagExists === undefined) {
            startTagsMutation(tag);
        } else {
            console.log(tagExists.id)
            dispatch(selectTag(tagExists.id));
        }
    }, [tags]);
    return [isMutating, selectTagHandler]
}