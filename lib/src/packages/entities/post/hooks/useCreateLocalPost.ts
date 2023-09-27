import { useDispatch } from 'react-redux';
import { Post } from 'types/post';
import { deletePost, setList } from '../actions/list.actions';
import { useGetPosts } from './useGetPosts';


export type UseCreateLocalPostHandler = (post: Post) => Post['_id'];
export type RemoveLocalPostHandler=(localPostId:number)=>void;
export type UseCreateLocalPost = () => [UseCreateLocalPostHandler,RemoveLocalPostHandler];


/**
 * Custom hook for showing messages by dispatching a Redux action.
 *
 * @returns {Function} A function to show a message by dispatching the corresponding action.
 * - type: The type of the message action.
 * - text: The text content of the message.
 */

export const useCreateLocalPost: UseCreateLocalPost = () => {
    const dispatch = useDispatch();
    const posts = useGetPosts('short');
    const createLocalPostHandler: UseCreateLocalPostHandler = (postData) => {
        postData._id = posts.length;
        postData.pubDate = (new Date()).toUTCString();
        posts.push({ ...postData });
        dispatch(setList(posts));
        return postData._id;
    }
    const removeLocalPostHandler:RemoveLocalPostHandler=(localPostId)=>{
        dispatch(deletePost(localPostId));
    }
    return [createLocalPostHandler,removeLocalPostHandler];
}