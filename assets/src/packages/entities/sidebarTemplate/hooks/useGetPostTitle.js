import { useSelector } from "react-redux"

export const useGetPostTitle = () => {
        const { title } = useSelector(state => state.parse.sidebarTemplate.parsedData);
        return title;
    }