import { useSelector } from "react-redux"
import { ParserRootState } from "types/state";

export type UseGetUrl=()=>string|false


/**
 * Custom hook for accessing the URL state from the dialog.url.
 *
 * @returns {string} The URL value from the Redux store.
 */

export const useGetUrl:UseGetUrl=()=>{
    const url=useSelector((state:ParserRootState)=>state.parse.dialog.url)
    return url;
}