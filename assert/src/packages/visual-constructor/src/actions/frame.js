export const types={
    SELECT_TITLE:'SELECT_TITLE',
    SELECT_FEATURED_IMAGE:'SELECT_FEATURED_IMAGE',
    SELECT_CONTENT:'SELECT_CONTENT',
    REMOVE_CONTENT:'REMOVE_CONTENT',
    TOGGLE_NO_FEATURED_IMAGE:'TOGGLE_NO_FEATURED_IMAGE'
}

export function selectTitle(title){
    return {
        type:types.SELECT_TITLE,
        title
    }
}
export function selectFeaturedImage(url){
    return {
        type:types.SELECT_FEATURED_IMAGE,
        url
    }
}
export function selectContent(hash,content){
    return {
        type:types.SELECT_CONTENT,
        hash,
        content
    }
}
export function removeContent(hash){
    return {
        type:types.REMOVE_CONTENT,
        hash
    }
}