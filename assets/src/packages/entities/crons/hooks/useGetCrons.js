import { useSelector } from "react-redux"

export const useGetCrons=()=>{
    const crons=useSelector(state=>state.parse.crons);
    return crons;
}