
export const types={
    TOGGLE_ADD_FEATURED_MEDIA:'TOGGLE_ADD_FEATURED_MEDIA',
    TOGGLE_SAVE_PARSING_TEMPLATE:'TOGGLE_SAVE_PARSING_TEMPLATE',
    ADD_SOURCE:'ADD_SOURCE'
}


export function toggleAddFeaturedMedia(){
    return {
        type:types.TOGGLE_ADD_FEATURED_MEDIA
    }
}
export function toggleAddSource(){
    return {
        type:types.ADD_SOURCE
    }
}
export function toggleSaveParsingTemplate(){
    return {
        type:types.TOGGLE_SAVE_PARSING_TEMPLATE
    }
}