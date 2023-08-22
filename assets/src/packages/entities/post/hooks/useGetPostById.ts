import { useSelector } from 'react-redux'
import { ParserRootState } from 'types/state';
import { Post } from 'types/post';

namespace useGetPostById {
    export type GetPostById = (_id: number) => Post[];
    export type UseGetPostById = () => GetPostById
}

/**
*
* Custom hook for retrieving a post by its ID.
* @returns {Function} A function that takes a post ID and returns an array of posts matching the ID.
* @param {number} _id - The ID of the post to retrieve.
*/

export const useGetPostById: useGetPostById.UseGetPostById = () => {
    const posts: Post[] = useSelector((state: ParserRootState) => state.parse.items.data);
    return (_id) => posts.filter(post => post._id = _id)
}