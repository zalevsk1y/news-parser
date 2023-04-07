import { SELECT,VISUAL_CONSTRUCTOR,PARSED_DATA,TITLE,FEATURED_MEDIA,CONTENT,DESELECT } from '../../../widgets/visual-constructor/constants'

export const SELECT_TITLE=`[${VISUAL_CONSTRUCTOR}.${PARSED_DATA}.${TITLE}:${SELECT}]`,
        SELECT_FEATURED_MEDIA=`[${VISUAL_CONSTRUCTOR}.${PARSED_DATA}.${FEATURED_MEDIA}:${SELECT}]`,
        SELECT_CONTENT=`[${VISUAL_CONSTRUCTOR}.${PARSED_DATA}.${CONTENT}:${SELECT}]`,
        REMOVE_CONTENT=`[${VISUAL_CONSTRUCTOR}.${PARSED_DATA}.${CONTENT}:${DESELECT}]`;
        


export function selectTitle(title){
    return {
        type:SELECT_TITLE,
        title
    }
}
export function selectFeaturedMedia(url){
    return {
        type:SELECT_FEATURED_MEDIA,
        url
    }
}
export function selectContent(hash,content){
    return {
        type:SELECT_CONTENT,
        hash,
        content
    }
}
export function removeContent(hash){
    return {
        type:REMOVE_CONTENT,
        hash
    }
}
