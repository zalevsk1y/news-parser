import { useSelector } from "react-redux"
import {ParserRootState} from 'types/state'

namespace useGetTemplate{
    export type UseGetTemplate = ()=> ParserRootState['parse']['template']
}

export const useGetTemplate:useGetTemplate.UseGetTemplate=()=>{
    const template=useSelector((state:ParserRootState)=>state.parse.template);
    return template;
}