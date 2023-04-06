import { useSelector } from "react-redux"

export const useGetStatusVisibility=()=>{
    const {status, publish, postFormat}=useSelector(state=>state.parse.sidebar)
    return [status, publish, postFormat]
}