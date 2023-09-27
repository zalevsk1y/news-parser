import { useSelector } from "react-redux"
import { ParserRootState } from "types/state";

export const useGetSaveParsingTemplate=()=>{
    const {saveParsingTemplate}=useSelector((state:ParserRootState)=>state.parse.sidebarTemplate.options);
    return saveParsingTemplate;
}