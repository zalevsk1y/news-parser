import  {types} from './index';


export const addThumbnail=()=>{
    return{
        type:types.post.TOGGLE_ADD_THUMBNAIL,
      
    }
}
export const parseOtherPictures=()=>{
    return{
        type:types.post.TOGGLE_PARSE_OTHER_PICTURES,
    }
}
export const showPicturesDialog=()=>{
    return{
        type:types.post.TOGGLE_SHOW_PICTURES_DIALOG,
    }
}
export const maxPictures=(number)=>{
    return{
        type:types.post.CHANGE_MAX_PICTURES,
        number:number,
    }
}

