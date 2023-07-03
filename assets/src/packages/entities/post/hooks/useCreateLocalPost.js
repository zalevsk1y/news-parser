import { useDispatch } from "react-redux";
import { togglePostSelect } from '../actions/post.actions';
import { setList } from "../actions/list.actions";
import { useGetPosts } from "./useGetPosts";

export const useCreateLocalPost = () => {
    const dispatch = useDispatch();
    const posts = useGetPosts('short');
    return (postData) => {
        postData._id = posts.length;
        postData.pubDate = (new Date()).toUTCString();
        posts.push({...postData});
        dispatch(setList(posts));
        dispatch(togglePostSelect(postData._id));
        return postData._id;
    }
}