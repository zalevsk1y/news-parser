import { useSelector } from "react-redux"
import {table} from "@news-parser/helpers/classes/Table";
import { useMemo } from "react";

export const useGetPosts=()=>{
    const {data:posts,selecte,draft}=useSelector(state=>state.parse.items);
    const fullPostData=useMemo(()=>table(posts).join({selecte}).join(draft),[posts,selected,draft]);
    return fullPostData
}