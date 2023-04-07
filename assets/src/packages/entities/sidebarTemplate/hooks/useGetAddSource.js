import { useSelector } from "react-redux"


export const useGetAddSource=()=>{
    const {addSource}=useSelector(state=>state.parse.sidebarTemplate.options);
    return addSource;
}