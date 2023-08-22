import {useSelector} from 'react-redux';
import {ParserRootState} from 'types/state'

namespace useGetHTML{
    export type UseGetHTML=()=>ParserRootState['parse']['dialog']['rawHTML']
}

/**
 * Custom hook for accessing the raw HTML from the Redux store.
 *
 * @returns {string} The raw HTML value from the Redux store.
 */

export const useGetHTML=()=>{
    const {rawHTML} = useSelector((state:ParserRootState)=>state.parse.dialog);
    return rawHTML;
}