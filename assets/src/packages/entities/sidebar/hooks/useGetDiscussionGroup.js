export const useGetDiscussionGroup=()=>{
    const {allowComments,allowPinbacks}=useSelector(state=>state.parser.sidebar)
    return [allowComments,allowPinbacks]
}