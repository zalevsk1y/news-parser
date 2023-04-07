import { useSelector } from "react-redux"


export const useGetAddFeaturedMedia=()=>{
    const {addFeaturedMedia}=useSelector(state=>state.parse.sidebarTemplate.options);
    return addFeaturedMedia;
}