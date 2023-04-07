import { useSelector } from "react-redux"


export const useGetSaveParsingTemplate=()=>{
    const {saveParsingTemplate}=useSelector(state=>state.parse.sidebarTemplate.options);
    return saveParsingTemplate;
}