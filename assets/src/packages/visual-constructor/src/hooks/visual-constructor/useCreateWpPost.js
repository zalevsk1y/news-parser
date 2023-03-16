import { useDispatch } from "react-redux";
import { createWpPost } from "../../actions/post.actions";

export const useCreateWpPost = () => {
    const dispatch = useDispatch(),
        createWpPostCallback = () => dispatch(createWpPost());
    return [createWpPostCallback]
}