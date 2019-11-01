export const types={
    SELECT_TITLE:'SELECT_TITLE',
    SELECT_FEATURED_IMAGE:'SELECT_FEATURED_IMAGE',
    SELECT_CONTENT:'SELECT_CONTENT'
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
