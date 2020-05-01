import { useSelector } from "react-redux"
import { ParserRootState } from "types/state";

export const useGetAddFeaturedMedia=()=>{
    const {addFeaturedMedia}=useSelector((state:ParserRootState)=>state.parse.sidebarTemplate.options);
    return addFeaturedMedia;
}