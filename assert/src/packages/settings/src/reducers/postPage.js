
import {types} from '../actions/index';
import { defaultState } from './defaultState';

const postPage=(state=defaultState.settings.post,action)=>{
    switch (action.type){
        case types.main.SET_ALL_SETTINGS:
            return {...action.settings.post}
        case types.post.TOGGLE_ADD_THUMBNAIL:
            return {...state,addThumbnail:!state.addThumbnail}
        case types.post.TOGGLE_PARSE_OTHER_PICTURES:
            return {...state,parseOtherPictures:!state.parseOtherPictures};
        case types.post.TOGGLE_SHOW_PICTURES_DIALOG:
            return {...state,showPicturesDialog:!state.showPicturesDialog};    
        case types.post.CHANGE_MAX_PICTURES:
            return {...state,maxPictures:action.number}
        default:
            return state;
    }
}
export default postPage