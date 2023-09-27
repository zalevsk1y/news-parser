import { useSelector } from 'react-redux'
import { ParserRootState } from 'types/state';


export type Status = ParserRootState['parse']['sidebar']['status'];
export type Publish = ParserRootState['parse']['sidebar']['publish'];
export type PostFormat = ParserRootState['parse']['sidebar']['postFormat'];
export type UseGetStatusVisibility = () => [Status, Publish, PostFormat]


/**
 * Custom hook for retrieving status and visibility settings from the Redux store.
 *
 * @returns {Array} An array containing the status and visibility settings.
 * - status: The status of the post, obtained from the Redux store.
 * - publish: A boolean indicating whether the post is set to be published, obtained from the Redux store.
 * - postFormat: The post format, obtained from the Redux store.
 */

export const useGetStatusVisibility: UseGetStatusVisibility = () => {
    const { status, publish, postFormat } = useSelector((state: ParserRootState) => state.parse.sidebar)
    return [status, publish, postFormat]
}