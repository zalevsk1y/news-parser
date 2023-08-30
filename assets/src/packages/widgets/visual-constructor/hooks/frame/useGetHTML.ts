import {useSelector} from 'react-redux';
import {ParserRootState} from 'types/state'


export type UseGetHTML=()=>ParserRootState['parse']['dialog']['rawHTML']


/**
 * Custom hook for accessing the raw HTML from the Redux store.
 *
 * @returns {string} The raw HTML value from the Redux store.
 */

export const useGetHTML: UseGetHTML=()=>{
    const {rawHTML} = useSelector((state:ParserRootState)=>state.parse.dialog);
    return rawHTML;
}