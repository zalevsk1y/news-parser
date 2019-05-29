import {types} from './index';


export const addGallery=()=>{
    return{
        type:types.gallery.TOGGLE_ADD_GALLERY,
       
    }
}
export const shortCode=(text)=>{
    return{
        type:types.gallery.CHANGE_SHORTCODE,
        text:text
    }
}
export const parameterName=(text)=>{
    return{
        type:types.gallery.CHANGE_PARAMETER_NAME,
        text:text,
    }
}

