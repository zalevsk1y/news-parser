import { useSelector } from "react-redux"
import { ParserRootState } from "types/state";

export const useGetPostTitle = () => {
        const { title } = useSelector((state:ParserRootState) => state.parse.sidebarTemplate.parsedData);
        return title;
    }