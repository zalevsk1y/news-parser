import { useSelector } from "react-redux"
import { ParserRootState } from "types/state";

export const useGetAddSrcSetAndSizes=()=>{
const {addSrcSetAndSizes}=useSelector((state:ParserRootState)=>state.parse.sidebarTemplate.options);
    return addSrcSetAndSizes;
}