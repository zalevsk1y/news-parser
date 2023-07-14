import { useSelector } from "react-redux";

export const useGetTemplates =()=>{
    const templates=useSelector(state=>state.parse.templates);
    return templates;
}