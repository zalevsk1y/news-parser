import { useSelector } from "react-redux";

export const useGetDiscussionGroup = () => {
    const { allowComments, allowPinbacks } = useSelector(state => state.parse.sidebar)
    return [allowComments, allowPinbacks]
}