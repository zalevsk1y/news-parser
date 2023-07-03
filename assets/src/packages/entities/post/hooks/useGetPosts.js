import { useSelector } from "react-redux"
import {table} from "@news-parser/helpers/classes/Table";
import { useMemo } from "react";

export const useGetPosts=(data='full')=>{
    const {data:posts,select,draft}=useSelector(state=>state.parse.items);
    const fullPostData=useMemo(()=>table(posts).join({select,draft}),[posts,select,draft]);
    switch (data){
        case 'full':
            return fullPostData;
        case 'short':
            return [...posts]
    }
}