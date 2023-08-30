import { useDispatch, useSelector } from 'react-redux';
import { ParserRootState } from 'types/state';
import { useCreateTag } from './useCreateTag';
import { selectTag, diselectTag } from '../actions/tag.actions'


export type IsMutating = boolean;
export type SelectTagHandler = (tagName: string) => void;
export type DiselectTagHandler = (tagName: string) => void;
export type UseSelectTag = () => [IsMutating, SelectTagHandler, DiselectTagHandler]


/**
 * Custom hook for selecting and deselecting tags.
 * @type {UseSelectTag}
 * @returns {Array} An array containing the `isMutating` flag, `selectTagHandler` function, and `diselectTagHandler` function.
 */

export const useSelectTag: UseSelectTag = () => {
    const [isMutating, startTagsMutation] = useCreateTag();
    const { tags } = useSelector((state: ParserRootState) => state.parse.sidebar);
    const dispatch = useDispatch();
    const selectTagHandler: SelectTagHandler = tagName => {
            const selectedTag=tags[tagName];
            if (selectedTag!==undefined) {
                dispatch(selectTag(selectedTag.id));
            } else {
                startTagsMutation(tagName).then(tag => dispatch(selectTag(tag.id))).catch(tagCreateError => tagCreateError?.data?.term_id && dispatch(selectTag(tagCreateError.data.term_id)));
        }
    };
    const diselectTagHandler: DiselectTagHandler = tagName => {
        const selectedTag=tags[tagName];
        if (selectedTag!== undefined) {
            dispatch(diselectTag(selectedTag.id));
        }
    };
    return [isMutating, selectTagHandler, diselectTagHandler]
}