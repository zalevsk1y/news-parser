import { useSelector } from "react-redux"
import { ParserRootState } from "types/state";

namespace useGetPostId{
    export type UseGetPostId=()=>number|false
}

/**
 * Custom hook for accessing the _id state from the dialog._id.
 *
 * @returns {string} The _id value from the Redux store.
 */

export const useGetPostId:useGetPostId.UseGetPostId=()=>{
    const _id=useSelector((state:ParserRootState)=>state.parse.dialog._id);
    return _id
}