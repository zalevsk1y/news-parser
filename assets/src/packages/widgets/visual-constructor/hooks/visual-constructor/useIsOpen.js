import {useSelector} from 'react-redux';

export const useIsOpen=()=>{
    const { url, isOpen } = useSelector(state => state.parse.dialog.dialogData);
    return [url,isOpen]
}