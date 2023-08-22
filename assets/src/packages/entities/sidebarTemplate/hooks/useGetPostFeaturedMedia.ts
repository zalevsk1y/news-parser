import { useSelector } from "react-redux"
import { ParserRootState } from "types/state";

export const useGetPostFeaturedMedia=()=>{
    const {image}=useSelector((state:ParserRootState)=>state.parse.sidebarTemplate.parsedData);
    return image;
}