import { useSelector } from "react-redux"

export const useGetUrl=()=>{
    const url=useSelector(state=>state.parse.dialog.dialogData.url)
    return url;
}