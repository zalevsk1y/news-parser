import { useSelector } from 'react-redux';
import { ParserRootState } from 'types/state';


export type AllowComments = ParserRootState['parse']['sidebar']['allowComments'];
export type AllowPinbacks = ParserRootState['parse']['sidebar']['allowPinbacks'];
export type UseGetDiscussionGroup = () => [AllowComments, AllowPinbacks]


/**
 * Custom hook for retrieving discussion group settings from the Redux store.
 *
 * @returns {Array} An array containing the discussion group settings.
 * - allowComments: A boolean indicating whether comments are allowed, obtained from the Redux store.
 * - allowPinbacks: A boolean indicating whether pinbacks are allowed, obtained from the Redux store.
 */

export const useGetDiscussionGroup: UseGetDiscussionGroup = () => {
    const { allowComments, allowPinbacks } = useSelector((state: ParserRootState) => state.parse.sidebar)
    return [allowComments, allowPinbacks]
}