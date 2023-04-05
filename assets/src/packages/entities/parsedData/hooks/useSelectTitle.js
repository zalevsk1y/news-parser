import { useDispatch } from "react-redux";
import { useCallback} from "react";

export const  useSelectTitle=()=>{
    const dispatch=useDispatch();
    const selectTitle=useCallback((title) => title && dispatch(selectTitle(title)), [dispatch]);
    return selectTitle;
}