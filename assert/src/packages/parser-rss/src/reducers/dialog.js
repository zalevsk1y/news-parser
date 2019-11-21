
import {galleryDialog} from './galleryDialog';
import visualConstructor from '@news-parser/visual-constructor/reducers'

export default function dialog(state={},action){

let subReducers=[galleryDialog,visualConstructor],
        newState=state;
        subReducers.forEach(reducer => {
            newState=reducer.call(this,newState,action)
        });
    return newState;
}