import {useSelector} from 'react-redux';

export const useIsOpen=()=>{
    const { url, isOpen } = useSelector(state => state.parse.dialog.visualConstructor.dialogData);
    return [url,isOpen]
}