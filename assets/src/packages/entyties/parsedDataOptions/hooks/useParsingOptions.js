import { useDispatch } from "react-redux";
import { useCallback} from "react";

export const  useSelectTitle=()=>{
    const dispatch=useDispatch();
    const toggleSaveParsingTemplate = useCallback(() => dispatch(toggleSaveParsingTemplate()), [dispatch]);
    const toggleAddSource = useCallback(() => dispatch(toggleAddSource()), [dispatch]);
    const toggleAddFeaturedMedia = useCallback(() => dispatch(toggleAddFeaturedMedia()), [dispatch]);

    return [ toggleSaveParsingTemplate, toggleAddSource, toggleAddFeaturedMedia]
}