
import {types} from '../actions/index';
import { defaultState } from './defaultState';


const galleryPage=(state=defaultState.settings.gallery,action)=>{
 
    switch (action.type){
        case types.main.SET_ALL_SETTINGS:
            return {...action.settings.gallery};
        case types.gallery.TOGGLE_ADD_GALLERY:
            return{...state,
            addGallery:!state.addGallery
        };
        case types.gallery.CHANGE_SHORTCODE:
            return {...state,
            shortCode:action.text
        };
        case types.gallery.CHANGE_PARAMETER_NAME:
            return {...state,
            parameterName:action.text
        };
        default:
        return {...state}
    }
}
export default galleryPage;