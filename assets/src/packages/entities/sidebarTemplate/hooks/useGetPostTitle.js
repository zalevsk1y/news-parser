import { useSelector } from "react-redux"

export const useGetPostTitle = () => {
        const { title } = useSelector(state => state.parser.sidebarTemplate.parsedData);
        return title;
    }