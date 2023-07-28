import { useDispatch, useSelector } from "react-redux";
import { useCreateTag } from './useCreateTag';
import {selectTag,diselectTag} from '../actions/tag.actions'

export const useSelectTag = () => {
    const [isMutating, startTagsMutation] = useCreateTag();
    const {tags}=useSelector(state=>state.parse.sidebar);
    console.log('tags update',Object.keys(tags).length);
    const dispatch = useDispatch();
    const selectTagHandler =tagName => {
        if(tags[tagName]===undefined){
            startTagsMutation(tagName).then(tag=>dispatch(selectTag(tag.id))).catch(tagCreateError=>tagCreateError?.data?.term_id&&dispatch(selectTag(tagCreateError.data.term_id)));
        }else{
            dispatch(selectTag(tags[tagName].id));
        }
    };
    const diselectTagHandler = tagName => {
        if(tags[tagName]!==undefined){
            
            dispatch(diselectTag(tags[tagName].id));
        }
    };
    return [isMutating, selectTagHandler,diselectTagHandler]
}