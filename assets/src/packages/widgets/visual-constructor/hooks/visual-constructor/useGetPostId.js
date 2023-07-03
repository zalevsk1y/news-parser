import { useSelector } from "react-redux"

export const useGetPostId=()=>{
    const _id=useSelector(state=>state.parse.dialog.dialogData._id);
    return _id
}