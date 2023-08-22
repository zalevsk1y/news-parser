import { useSelector } from 'react-redux'
import { ParserRootState } from 'types/state';

namespace useGetTags {
    export type Tags = ParserRootState['parse']['sidebar']['tags'];
    export type UseGetTags = () => [Tags]
}

/**
 * Custom hook for retrieving tags from the Redux store.
 *
 * @returns {Array} An array containing the tags obtained from the Redux store.
 * - tags: An array of tags.
 */

export const useGetTags: useGetTags.UseGetTags = () => {
    const { tags } = useSelector((state: ParserRootState) => state.parse.sidebar);
    return [tags]
}