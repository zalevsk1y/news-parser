import {useSelector} from 'react-redux';

const useSaveParsingTemplate=()=>{
    const saveParsingTemplate=useSelector(state => state.parse.dialog.visualConstructor.options.saveParsingTemplate);
    return saveParsingTemplate;
}