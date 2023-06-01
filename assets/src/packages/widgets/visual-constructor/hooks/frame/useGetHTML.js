import {useSelector} from 'react-redux';

export const useGetHTML=()=>{
    
    const rawHTML = useSelector(state=>state.parse.dialog.dialogData.rawHTML);
    return rawHTML;
}