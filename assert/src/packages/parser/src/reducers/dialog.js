
import {galleryDialog} from './galleryDialog';
import {visualConstructorDialog} from './visualConstructorDialog';
import {visualConstructorModal} from '@news-parser/visual-constructor/reducers'

export default function dialog(state={},action){
    let subReducers=[galleryDialog,visualConstructorDialog,visualConstructorModal],
        newState=state;
        subReducers.forEach(reducer => {
            newState=reducer.call(this,newState,action)
        });
    return newState;
}