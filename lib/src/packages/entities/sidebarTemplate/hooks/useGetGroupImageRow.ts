import { useSelector } from "react-redux"
import { ParserRootState } from "types/state";

export const useGetGroupImageRow=()=>{
const {groupImagesRow}=useSelector((state:ParserRootState)=>state.parse.sidebarTemplate.options);
    return groupImagesRow;
}