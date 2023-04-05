import { useSelector } from "react-redux"

export const useIsMutating=()=>{
    const isMutating=useSelector(state=>state.parse.dialog.dialogData.isFetching);
    return isMutating
}