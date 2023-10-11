import { useSelector } from "react-redux"
import { table } from "@news-parser/helpers/classes/Table";
import { useMemo } from "react";
import { Post } from "types/post";
import { ParserRootState } from "types/state";

export type UseGetPosts = (data?: 'full' | 'short') => Post[]


/**
*
* Custom hook for retrieving posts.
* @param {string} [data='full'] - The type of post data to retrieve. Defaults to 'full'.
* @returns {Array} An array of posts based on the specified data type.
*/


export const useGetPosts: UseGetPosts = (data = 'full') => {
    const { data: posts, select, draft } = useSelector((state: ParserRootState) => state.parse.items);
    const fullPostData = useMemo(() => table(posts).join({ select, draft }), [posts, select, draft]) as Array<Post>;
    switch (data) {
        case 'full':
            return fullPostData;
        case 'short':
            return [...posts]
    }
}