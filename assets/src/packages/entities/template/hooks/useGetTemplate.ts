import { useSelector } from "react-redux"
import {ParserRootState} from 'types/state'

export type UseGetTemplate = ()=> ParserRootState['parse']['template']


export const useGetTemplate:UseGetTemplate=()=>{
    const template=useSelector((state:ParserRootState)=>state.parse.template);
    return template;
}