import { useSelector } from "react-redux"
import { ParserRootState } from "types/state";

export const useGetAddSource=()=>{
const {addSource}=useSelector((state:ParserRootState)=>state.parse.sidebarTemplate.options);
    return addSource;
}