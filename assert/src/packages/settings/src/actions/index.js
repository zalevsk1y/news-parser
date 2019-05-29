import {toggleAddSource} from './generalPage';
import {addThumbnail,parseOtherPictures,showPicturesDialog,maxPictures} from './postPage';
import {addGallery,shortCode,parameterName} from './galleryPage';
import {getDefaultSettingsFromServer,saveSettingsToServer,getSettingsFromServer} from './mainButtons';

export const types={
    main:{
        SEND_REQUEST:'SEND_REQUEST',
        RECEIVE_RESPONSE:'RECEIVE_RESPONSE',
        SET_ALL_SETTINGS:'SET_ALL_SETTINGS',
        RESET_TO_DEFAULT:'RESET_TO_DEFAULT'
    },
    general:{
        TOGGLE_ADDSOURCE:'TOGGLE_ADDSOURCE'
    },
    post:{
        TOGGLE_ADD_THUMBNAIL:'TOGGLE_DOWNLOAD_PICTURES',
        TOGGLE_SHOW_PICTURES_DIALOG:'TOGGLE_SHOW_PICTURES_DIALOG',
        CHANGE_MAX_PICTURES:'CHANGE_MAX_PICTURES',
        TOGGLE_PARSE_OTHER_PICTURES:'TOGGLE_PARSE_OTHER_PICTURES'
    },
    gallery:{
        TOGGLE_ADD_GALLERY:"TOGGLE_ADD_GALLERY",
        CHANGE_SHORTCODE:"CHANGE_SHORTCODE",
        CHANGE_PARAMETER_NAME:"CHANGE_PARAMETER_NAME"
    }

}


export const GALLERY_FIELD_NAME='gallery';
export const POST_FIELD_NAME='post';
export const GENERAL_FIELD_NAME='general';

export const  generalPage={toggleAddSource};
export const  postPage={addThumbnail,parseOtherPictures,showPicturesDialog,maxPictures};
export const  galleryPage={addGallery,shortCode,parameterName};
export const  main={getDefaultSettingsFromServer,saveSettingsToServer,getSettingsFromServer}
