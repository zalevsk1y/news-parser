export const types = {
    FOCUS_PICTURE: 'FOCUS_PICTURE',
    SELECT_PICTURE:'SELECT_PICTURE',
    BLUR_PICTURE:'BLUR_PICTURE',
    DESELECT_PICTURE:'DESELECT_PICTURE',
    UPDATE_PICTURE_INFO:'UPDATE_PICTURE_INFO'
}

export function focusPicture(id){
    return {
        type:types.FOCUS_PICTURE,
        id
    }
}
export function selectPicture(id){
    return {
        type:types.SELECT_PICTURE,
        id
    }
}
export function deselectPicture(id){
    return {
        type:types.DESELECT_PICTURE,
        id
    }
}

export function updatePictureInfo(id,info){
    return {
        type:types.UPDATE_PICTURE_INFO,
        id,
        info
    }
}


