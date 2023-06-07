import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { resetSidebar } from "../actions/main.actions";


export const useResetSidebar = () => {
    const dispatch = useDispatch();
    const resetSidebarHandler = useCallback(() => dispatch(resetSidebar()));
    return resetSidebarHandler;
}