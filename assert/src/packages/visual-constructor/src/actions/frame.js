export const types={
    SELECT_TITLE:'SELECT_TITLE',
    SELECT_FEATURED_MEDIA:'SELECT_FEATURED_MEDIA',
    SELECT_CONTENT:'SELECT_CONTENT',
    REMOVE_CONTENT:'REMOVE_CONTENT',
}

export function selectTitle(title){
    return {
        type:types.SELECT_TITLE,
        title
    }
}
export function selectFeaturedMedia(url){
    return {
        type:types.SELECT_FEATURED_MEDIA,
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