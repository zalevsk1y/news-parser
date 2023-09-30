import { useDispatch } from "react-redux"
import { setCronOpions } from "../actions/cronOptions.actions";
import { initialCroneState } from "../reducers/initialState";



export const useResetCronOptions=()=>{
    const dispatch=useDispatch();
    return ()=>dispatch(setCronOpions(initialCroneState));
}