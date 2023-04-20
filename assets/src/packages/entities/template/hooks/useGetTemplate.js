import { useSelector } from "react-redux"


export const useGetTemplate=()=>{
    const template=useSelector(state=>state.parse.template);
    return template;
}