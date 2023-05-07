import { useSelector } from "react-redux"

export const useGetPostFeaturedMedia=()=>{
    const {image}=useSelector(state=>state.parse.sidebarTemplate.parsedData);
    return image;
}