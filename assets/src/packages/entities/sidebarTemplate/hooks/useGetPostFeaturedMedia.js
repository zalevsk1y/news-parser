import { useSelector } from "react-redux"

export const useGetPostFeaturedMedia=()=>{
    const {image}=useSelector(state=>state.parser.sidebarTemplate.parsedData);
    return image;
}